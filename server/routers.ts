import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { 
  createUser, 
  getUserByEmail, 
  getUserById, 
  getAllUsers, 
  getAdminByEmail, 
  getRandomQuestions,
  getQuestionWithOptions,
  createTestSession,
  getTestSessionByUserId,
  completeTestSession,
  recordTestAnswer,
  getTestAnswersBySessionId,
  markUserTestCompleted
} from "./db";
import { 
  hashPassword, 
  verifyPassword, 
  generateUserToken, 
  generateAdminToken, 
  verifyToken 
} from "./auth";

export const appRouter = router({
  system: systemRouter,

  // User Authentication
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    // User registration (email + name)
    registerUser: publicProcedure
      .input(z.object({ email: z.string().email(), name: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const existing = await getUserByEmail(input.email);
        if (existing) {
          throw new Error("Email already registered");
        }
        
        const result = await createUser(input.email, input.name);
        const user = await getUserByEmail(input.email);
        
        if (!user) throw new Error("Failed to create user");
        
        const token = await generateUserToken(user.id, user.email);
        return { user, token };
      }),
    
    // User login (email + name verification)
    loginUser: publicProcedure
      .input(z.object({ email: z.string().email(), name: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const user = await getUserByEmail(input.email);
        if (!user) {
          throw new Error("User not found");
        }
        
        if (user.name !== input.name) {
          throw new Error("Invalid name");
        }
        
        const token = await generateUserToken(user.id, user.email);
        return { user, token };
      }),
    
    // Admin login (email + password)
    loginAdmin: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const admin = await getAdminByEmail(input.email);
        if (!admin) {
          throw new Error("Admin not found");
        }
        
        if (!verifyPassword(input.password, admin.passwordHash)) {
          throw new Error("Invalid password");
        }
        
        const token = await generateAdminToken(admin.id, admin.email);
        return { admin, token };
      }),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Test Management
  test: router({
    // Check if user has completed test
    hasCompletedTest: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        const user = await getUserById(input.userId);
        return { hasCompleted: user?.hasCompletedTest || false };
      }),
    
    // Get 20 random questions for test
    getTestQuestions: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        const user = await getUserById(input.userId);
        if (!user) throw new Error("User not found");
        if (user.hasCompletedTest) throw new Error("Test already completed");
        
        // Get random 20 questions
        const allQuestions = await getRandomQuestions(200);
        const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
        
        // Get options for each question
        const questionsWithOptions = await Promise.all(
          shuffled.map(async (q) => {
            const opts = await getQuestionWithOptions(q.id);
            return opts;
          })
        );
        
        return questionsWithOptions;
      }),
    
    // Submit test answers
    submitTest: publicProcedure
      .input(z.object({
        userId: z.number(),
        answers: z.array(z.object({
          questionId: z.number(),
          selectedOptionId: z.number()
        }))
      }))
      .mutation(async ({ input }) => {
        const user = await getUserById(input.userId);
        if (!user) throw new Error("User not found");
        if (user.hasCompletedTest) throw new Error("Test already completed");
        
        // Create test session
        const sessionResult = await createTestSession(input.userId);
        const sessionId = (sessionResult as any).insertId;
        
        let correctCount = 0;
        let incorrectCount = 0;
        
        // Process each answer
        for (const answer of input.answers) {
          const question = await getQuestionWithOptions(answer.questionId);
          if (!question) continue;
          
          const selectedOption = question.options.find(o => o.id === answer.selectedOptionId);
          if (!selectedOption) continue;
          
          const isCorrect = selectedOption.isCorrect;
          if (isCorrect) {
            correctCount++;
          } else {
            incorrectCount++;
          }
          
          await recordTestAnswer(sessionId, answer.questionId, answer.selectedOptionId, isCorrect);
        }
        
        // Complete test session
        await completeTestSession(sessionId, correctCount, incorrectCount);
        await markUserTestCompleted(input.userId);
        
        const score = Math.round((correctCount / (correctCount + incorrectCount)) * 100);
        
        return {
          score,
          correctCount,
          incorrectCount,
          totalQuestions: input.answers.length
        };
      }),
    
    // Get user's test result
    getResult: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        const session = await getTestSessionByUserId(input.userId);
        if (!session) return null;
        
        return {
          score: session.score,
          correctCount: session.correctCount,
          incorrectCount: session.incorrectCount,
          completedAt: session.completedAt
        };
      }),
  }),

  // Admin Panel
  admin: router({
    // Get all users with their test scores
    getAllUsers: publicProcedure.query(async () => {
      const users = await getAllUsers();
      
      // Get test results for each user
      const usersWithScores = await Promise.all(
        users.map(async (user) => {
          const session = await getTestSessionByUserId(user.id);
          return {
            ...user,
            testScore: session?.score || null,
            hasCompletedTest: user.hasCompletedTest,
            completedAt: session?.completedAt || null
          };
        })
      );
      
      return usersWithScores;
    }),
    
    // Search users by email or name
    searchUsers: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        const allUsers = await getAllUsers();
        
        const filtered = allUsers.filter(u => 
          u.email.toLowerCase().includes(input.query.toLowerCase()) ||
          u.name.toLowerCase().includes(input.query.toLowerCase())
        );
        
        const usersWithScores = await Promise.all(
          filtered.map(async (user) => {
            const session = await getTestSessionByUserId(user.id);
            return {
              ...user,
              testScore: session?.score || null,
              hasCompletedTest: user.hasCompletedTest,
              completedAt: session?.completedAt || null
            };
          })
        );
        
        return usersWithScores;
      }),
    
    // Get specific user's detailed score
    getUserScore: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        const user = await getUserById(input.userId);
        if (!user) throw new Error("User not found");
        
        const session = await getTestSessionByUserId(input.userId);
        if (!session) return null;
        
        const answers = await getTestAnswersBySessionId(session.id);
        
        return {
          user,
          testScore: session.score,
          correctCount: session.correctCount,
          incorrectCount: session.incorrectCount,
          completedAt: session.completedAt,
          answers
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
