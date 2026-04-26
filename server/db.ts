import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { users, questions, questionOptions, testSessions, testAnswers, adminAccounts } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// User queries
export async function createUser(email: string, name: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(users).values({ email, name });
  return result;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(users);
}

export async function markUserTestCompleted(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(users).set({ hasCompletedTest: true }).where(eq(users.id, userId));
}

// Admin queries
export async function getAdminByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(adminAccounts).where(eq(adminAccounts.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Question queries
export async function getRandomQuestions(count: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(questions).limit(count);
}

export async function getQuestionWithOptions(questionId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const q = await db.select().from(questions).where(eq(questions.id, questionId)).limit(1);
  if (q.length === 0) return null;
  
  const opts = await db.select().from(questionOptions).where(eq(questionOptions.questionId, questionId));
  return { ...q[0], options: opts };
}

// Test session queries
export async function createTestSession(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(testSessions).values({ userId });
  return result;
}

export async function getTestSessionByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(testSessions).where(eq(testSessions.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function completeTestSession(sessionId: number, correctCount: number, incorrectCount: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const score = Math.round((correctCount / (correctCount + incorrectCount)) * 100);
  await db.update(testSessions).set({ 
    completedAt: new Date(),
    score,
    correctCount,
    incorrectCount
  }).where(eq(testSessions.id, sessionId));
}

// Test answer queries
export async function recordTestAnswer(sessionId: number, questionId: number, selectedOptionId: number, isCorrect: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(testAnswers).values({ sessionId, questionId, selectedOptionId, isCorrect });
}

export async function getTestAnswersBySessionId(sessionId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(testAnswers).where(eq(testAnswers.sessionId, sessionId));
}
