import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, tinyint } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Regular users table for custom email/name authentication.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  lastTestDate: timestamp("lastTestDate"), // Track when user last took the test (for monthly limit)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Admin accounts table for admin authentication.
 */
export const adminAccounts = mysqlTable("adminAccounts", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminAccount = typeof adminAccounts.$inferSelect;
export type InsertAdminAccount = typeof adminAccounts.$inferInsert;

/**
 * Questions pool (200 questions covering all Lume modules).
 */
export const questions = mysqlTable("questions", {
  id: int("id").autoincrement().primaryKey(),
  questionRu: text("questionRu").notNull(),
  questionUz: text("questionUz").notNull(),
  screenshotUrl: varchar("screenshotUrl", { length: 512 }).notNull(),
  module: varchar("module", { length: 100 }).notNull(), // e.g., "Warehouse Operations", "Finance", etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = typeof questions.$inferInsert;

/**
 * Answer options for each question (3-4 options per question).
 */
export const questionOptions = mysqlTable("questionOptions", {
  id: int("id").autoincrement().primaryKey(),
  questionId: int("questionId").notNull(),
  optionTextRu: text("optionTextRu").notNull(),
  optionTextUz: text("optionTextUz").notNull(),
  isCorrect: boolean("isCorrect").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuestionOption = typeof questionOptions.$inferSelect;
export type InsertQuestionOption = typeof questionOptions.$inferInsert;

/**
 * Test sessions - one per user, tracks test completion.
 */
export const testSessions = mysqlTable("testSessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  score: tinyint("score"), // Percentage or raw score
  correctCount: tinyint("correctCount"),
  incorrectCount: tinyint("incorrectCount"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TestSession = typeof testSessions.$inferSelect;
export type InsertTestSession = typeof testSessions.$inferInsert;

/**
 * User answers during a test session.
 */
export const testAnswers = mysqlTable("testAnswers", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  questionId: int("questionId").notNull(),
  selectedOptionId: int("selectedOptionId").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TestAnswer = typeof testAnswers.$inferSelect;
export type InsertTestAnswer = typeof testAnswers.$inferInsert;

/**
 * Relations for type safety.
 */
export const questionsRelations = relations(questions, ({ many }) => ({
  options: many(questionOptions),
  answers: many(testAnswers),
}));

export const questionOptionsRelations = relations(questionOptions, ({ one }) => ({
  question: one(questions, {
    fields: [questionOptions.questionId],
    references: [questions.id],
  }),
}));

export const testSessionsRelations = relations(testSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [testSessions.userId],
    references: [users.id],
  }),
  answers: many(testAnswers),
}));

export const testAnswersRelations = relations(testAnswers, ({ one }) => ({
  session: one(testSessions, {
    fields: [testAnswers.sessionId],
    references: [testSessions.id],
  }),
  question: one(questions, {
    fields: [testAnswers.questionId],
    references: [questions.id],
  }),
  option: one(questionOptions, {
    fields: [testAnswers.selectedOptionId],
    references: [questionOptions.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  testSessions: many(testSessions),
}));