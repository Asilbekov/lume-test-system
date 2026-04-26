# Lume Test System - TODO

## Phase 1: Content & Research
- [x] Explore lume.uz admin system to understand all modules
- [x] Gather 200 questions covering all Lume modules

## Phase 2: Database Schema
- [x] Design users table (email, name, hasCompletedTest)
- [x] Design admin_accounts table (email, password_hash)
- [x] Design questions table (id, question_ru, question_uz, screenshot_url, module)
- [x] Design question_options table (id, question_id, option_text_ru, option_text_uz, is_correct)
- [x] Design test_sessions table (id, user_id, started_at, completed_at, score, correct_count, incorrect_count)
- [x] Design test_answers table (id, session_id, question_id, selected_option_id, is_correct)
- [x] Push database migrations

## Phase 3: Authentication
- [x] Implement custom email/name registration endpoint
- [x] Implement custom email/name login endpoint with JWT
- [x] Implement admin login endpoint (email + password)
- [x] Create JWT token generation and validation
- [x] Implement logout endpoint
- [x] Add session management
- [x] Protect routes with authentication middleware

## Phase 4: Backend - Test Logic
- [x] Create endpoint to get 20 random questions from 200-pool
- [x] Create endpoint to check if user has already completed test
- [x] Create endpoint to submit test answers
- [x] Implement one-time test enforcement (prevent re-taking)
- [x] Create scoring logic (calculate correct/incorrect counts)
- [x] Create endpoint to get user's test results
- [x] Create admin endpoint to search users
- [x] Create admin endpoint to get leaderboard
- [x] Create admin endpoint to view specific user's score and test status

## Phase 5: Content Creation
- [x] Create 200 questions with Russian and Uzbek translations
- [x] Take/gather 200 screenshots from lume.uz covering all modules
- [x] Upload all screenshots to storage
- [x] Create database seed script with all 200 questions and options

## Phase 6: Frontend - UI & Design
- [x] Implement dramatic cinematic design system (teal/burnt orange gradient, bold white typography)
- [x] Create bilingual language context and switcher
- [x] Build landing page with login/register options
- [x] Build registration form (email, name)
- [x] Build login form (email, name)
- [x] Build admin login form (email, password)
- [x] Create test interface with question display, options, real-time counter
- [x] Build results page showing score and correct/incorrect counts
- [x] Implement language switcher accessible at all times

## Phase 7: Admin Panel
- [x] Build admin dashboard layout
- [x] Create user search functionality
- [x] Create leaderboard view with all users and scores
- [x] Create individual user score view
- [x] Show test completion status per user
- [x] Implement admin logout

## Phase 8: Integration & Testing
- [x] Test registration flow
- [x] Test login flow (user and admin)
- [x] Test one-time test enforcement
- [x] Test test-taking flow with real-time counter
- [x] Test results page
- [x] Test language switching
- [x] Test admin panel search and leaderboard
- [x] Test bilingual UI rendering
- [x] Verify dramatic design implementation
- [x] Create checkpoint and deliver
