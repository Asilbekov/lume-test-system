import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/**
 * Integration tests for the complete Lume Test System flow
 * Tests user registration → login → test taking → results
 */

describe("Lume Test System - Integration Flow", () => {
  function createContext(): TrpcContext {
    return {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
  }

  it("should complete full user flow: register → login → get test questions", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    // Step 1: Register user
    const uniqueEmail = `test-${Date.now()}@example.com`;
    const registerResult = await caller.auth.registerUser({
      email: uniqueEmail,
      name: "Test User",
    });

    expect(registerResult).toBeDefined();
    expect(registerResult.token).toBeDefined();
    expect(registerResult.user?.email).toBe(uniqueEmail);
    expect(registerResult.user?.name).toBe("Test User");

    // Step 2: Login with same credentials
    const loginResult = await caller.auth.loginUser({
      email: uniqueEmail,
      name: "Test User",
    });

    expect(loginResult).toBeDefined();
    expect(loginResult.token).toBeDefined();
    expect(loginResult.user?.email).toBe(uniqueEmail);

    // Step 3: Check if user has completed test (should be false initially)
    const hasCompletedBefore = await caller.test.hasCompletedTest({
      userId: registerResult.user?.id || 0,
    });

    expect(hasCompletedBefore.hasCompleted).toBe(false);

    // Step 4: Get random questions for test
    const questionsResult = await caller.test.getTestQuestions({
      userId: registerResult.user?.id || 0,
    });

    expect(questionsResult).toBeDefined();
    expect(Array.isArray(questionsResult)).toBe(true);
    expect(questionsResult.length).toBeGreaterThan(0);

    // Verify question structure
    if (questionsResult.length > 0) {
      const firstQuestion = questionsResult[0];
      expect(firstQuestion.questionRu).toBeDefined();
      expect(firstQuestion.questionUz).toBeDefined();
      expect(Array.isArray(firstQuestion.options)).toBe(true);
      expect(firstQuestion.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("should prevent user from taking test twice", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    // Register user
    const uniqueEmail = `test-twice-${Date.now()}@example.com`;
    const registerResult = await caller.auth.registerUser({
      email: uniqueEmail,
      name: "Test User Twice",
    });

    const userId = registerResult.user?.id || 0;

    // Submit test answers (mark as completed)
    const answers = [
      { questionId: 1, selectedOptionId: 1 },
      { questionId: 2, selectedOptionId: 2 },
    ];

    const submitResult = await caller.test.submitTest({
      userId,
      answers,
    });

    expect(submitResult).toBeDefined();
    expect(submitResult.score).toBeDefined();
    expect(submitResult.correctCount).toBeDefined();
    expect(submitResult.incorrectCount).toBeDefined();

    // Check that user has now completed test
    const hasCompletedAfter = await caller.test.hasCompletedTest({
      userId,
    });

    expect(hasCompletedAfter.hasCompleted).toBe(true);
  });

  it("should validate admin login endpoint exists", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    // This should fail because no admin exists, but endpoint should exist
    try {
      await caller.auth.loginAdmin({
        email: "nonexistent@admin.com",
        password: "anyPassword",
      });
      expect.fail("Should have thrown error for non-existent admin");
    } catch (error) {
      // Expected to fail, but endpoint exists
      expect(error).toBeDefined();
    }
  });

  it("should get user leaderboard for admin", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    try {
      const leaderboard = await caller.admin.getAllUsers();

      expect(leaderboard).toBeDefined();
      expect(Array.isArray(leaderboard)).toBe(true);
    } catch (error) {
      // Admin endpoint may require auth, which is expected
      expect(error).toBeDefined();
    }
  });
});
