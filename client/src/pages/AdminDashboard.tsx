import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { useState } from "react";
import { Globe, Search, LogOut, Trophy, User } from "lucide-react";

interface UserScore {
  id: number;
  name: string;
  email: string;
  score: number;
  correctCount: number;
  incorrectCount: number;
  completedAt: string;
  hasCompleted: boolean;
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real data from API
  const mockUsers: UserScore[] = [
    {
      id: 1,
      name: "Алексей Петров",
      email: "alex@example.com",
      score: 95,
      correctCount: 19,
      incorrectCount: 1,
      completedAt: "2026-04-25T10:30:00Z",
      hasCompleted: true
    },
    {
      id: 2,
      name: "Мария Иванова",
      email: "maria@example.com",
      score: 85,
      correctCount: 17,
      incorrectCount: 3,
      completedAt: "2026-04-25T11:15:00Z",
      hasCompleted: true
    },
    {
      id: 3,
      name: "Иван Сидоров",
      email: "ivan@example.com",
      score: 0,
      correctCount: 0,
      incorrectCount: 0,
      completedAt: "",
      hasCompleted: false
    }
  ];

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedUsers = mockUsers.filter((u) => u.hasCompleted);
  const avgScore =
    completedUsers.length > 0
      ? Math.round(
          completedUsers.reduce((sum, u) => sum + u.score, 0) / completedUsers.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-orange-900 relative overflow-hidden">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            {t("adminPanel", "Админ панель", "Admin paneli")}
          </h1>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <Button
                variant={language === "ru" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("ru")}
                className="gap-2"
              >
                <Globe className="w-4 h-4" />
                РУ
              </Button>
              <Button
                variant={language === "uz" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("uz")}
                className="gap-2"
              >
                <Globe className="w-4 h-4" />
                УЗ
              </Button>
            </div>
            <Button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
            >
              <LogOut className="w-4 h-4" />
              {t("logout", "Выход", "Chiqish")}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-cyan-500/30">
            <div className="text-cyan-400 text-sm font-semibold mb-2">
              {t("totalUsers", "Всего пользователей", "Jami foydalanuvchilar")}
            </div>
            <div className="text-4xl font-bold text-white">{mockUsers.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-green-500/30">
            <div className="text-green-400 text-sm font-semibold mb-2">
              {t("completed", "Завершили тест", "Test yakunlagan")}
            </div>
            <div className="text-4xl font-bold text-white">{completedUsers.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-orange-500/30">
            <div className="text-orange-400 text-sm font-semibold mb-2">
              {t("avgScore", "Средний балл", "O'rtacha ball")}
            </div>
            <div className="text-4xl font-bold text-white">{avgScore}%</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t("searchUsers", "Поиск пользователей...", "Foydalanuvchilarni qidirish...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-cyan-500/50 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-cyan-500/30 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              {t("leaderboard", "Таблица лидеров", "Liderlar jadvali")}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    {t("rank", "Место", "O'rin")}
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    {t("name", "Имя", "Ism")}
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    {t("email", "Email", "Email")}
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    {t("score", "Балл", "Ball")}
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    {t("correct", "Правильно", "To'g'ri")}
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    {t("incorrect", "Неправильно", "Noto'g'ri")}
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    {t("status", "Статус", "Holat")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-semibold">{index + 1}</td>
                      <td className="px-6 py-4 text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-cyan-400" />
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-gray-300">{user.email}</td>
                      <td className="px-6 py-4">
                        {user.hasCompleted ? (
                          <span className="text-lg font-bold text-green-400">{user.score}%</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.hasCompleted ? (
                          <span className="text-green-400">{user.correctCount}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.hasCompleted ? (
                          <span className="text-red-400">{user.incorrectCount}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.hasCompleted ? (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                            {t("completed", "Завершен", "Yakunlangan")}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold">
                            {t("pending", "Ожидание", "Kutilmoqda")}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      {t("noResults", "Результаты не найдены", "Natijalar topilmadi")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
