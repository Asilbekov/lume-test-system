import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("Authentication System", () => {
  describe("User Registration", () => {
    it("should register a new user with email and name", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.registerUser({
        email: "test@example.com",
        name: "Test User",
      });

      expect(result.token).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user?.email).toBe("test@example.com");
      expect(result.user?.name).toBe("Test User");
    });

    it("should reject registration with invalid email", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      try {
        await caller.auth.registerUser({
          email: "invalid-email",
          name: "Test User",
        });
        expect.fail("Should have thrown error for invalid email");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should reject registration with duplicate email", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      // First registration
      await caller.auth.registerUser({
        email: "duplicate@example.com",
        name: "First User",
      });

      // Second registration with same email
      try {
        await caller.auth.registerUser({
          email: "duplicate@example.com",
          name: "Second User",
        });
        expect.fail("Should have thrown error for duplicate email");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("User Login", () => {
    it("should login user with correct credentials", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      // Register first
      await caller.auth.registerUser({
        email: "login@example.com",
        name: "Login Test",
      });

      // Then login
      const result = await caller.auth.loginUser({
        email: "login@example.com",
        name: "Login Test",
      });

      expect(result.token).toBeDefined();
      expect(result.user?.email).toBe("login@example.com");
    });

    it("should reject login with incorrect name", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      // Register first
      await caller.auth.registerUser({
        email: "wrongname@example.com",
        name: "Correct Name",
      });

      // Try login with wrong name
      try {
        await caller.auth.loginUser({
          email: "wrongname@example.com",
          name: "Wrong Name",
        });
        expect.fail("Should have thrown error for wrong name");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should reject login with non-existent email", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      try {
        await caller.auth.loginUser({
          email: "nonexistent@example.com",
          name: "Any Name",
        });
        expect.fail("Should have thrown error for non-existent email");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("Admin Login", () => {
    it("should reject login with non-existent admin", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      try {
        await caller.auth.loginAdmin({
          email: "nonexistent@example.com",
          password: "anyPassword123",
        });
        expect.fail("Should have thrown error for non-existent admin");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
