import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Globe, LogOut, ArrowLeft, Calendar, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function UserProfile() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [userId, setUserId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Get user ID from localStorage
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("userEmail");
    if (id) {
      setUserId(parseInt(id));
      setUserEmail(email || "");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const { data: testResult, isLoading: resultLoading } = trpc.test.getResult.useQuery(
    { userId: userId || 0 },
    { enabled: !!userId }
  );

  const { data: canTakeTest, isLoading: canTakeLoading } = trpc.test.canTakeTest.useQuery(
    { userId: userId || 0 },
    { enabled: !!userId }
  );

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userToken");
      navigate("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleTakeTest = () => {
    if (canTakeTest?.canTake) {
      navigate("/test");
    } else {
      toast.error(canTakeTest?.message || "You cannot take the test now");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-orange-900 relative overflow-hidden">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
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

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white hover:text-cyan-300 transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        {t("back", "Назад", "Orqaga")}
      </button>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-20">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30 shadow-2xl mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {t("profile", "Профиль", "Profil")}
              </h1>
              <p className="text-gray-300">{userEmail}</p>
            </div>
            <Button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="bg-red-500 hover:bg-red-600 text-white gap-2"
            >
              <LogOut className="w-4 h-4" />
              {t("logout", "Выход", "Chiqish")}
            </Button>
          </div>
        </div>

        {/* Test Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Last Test Score */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">
                {t("lastScore", "Последняя оценка", "Oxirgi baho")}
              </h2>
            </div>
            {resultLoading ? (
              <div className="text-gray-300 animate-pulse">
                {t("loading", "Загрузка...", "Yuklanmoqda...")}
              </div>
            ) : testResult ? (
              <div>
                <div className="text-5xl font-bold text-cyan-400 mb-2">
                  {testResult.score}%
                </div>
                <div className="text-gray-300 space-y-2">
                  <p>
                    ✅ {t("correct", "Правильно", "To'g'ri")}: {testResult.correctCount}
                  </p>
                  <p>
                    ❌ {t("incorrect", "Неправильно", "Noto'g'ri")}: {testResult.incorrectCount}
                  </p>
                  {testResult.completedAt && (
                    <p className="text-sm text-gray-400">
                      {new Date(testResult.completedAt).toLocaleDateString(
                        language === "ru" ? "ru-RU" : "uz-UZ"
                      )}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-300">
                {t("noTestTaken", "Тест еще не пройден", "Test hali o'tilmadi")}
              </p>
            )}
          </div>

          {/* Test Availability */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-bold text-white">
                {t("nextTest", "Следующий тест", "Keyingi test")}
              </h2>
            </div>
            {canTakeLoading ? (
              <div className="text-gray-300 animate-pulse">
                {t("loading", "Загрузка...", "Yuklanmoqda...")}
              </div>
            ) : canTakeTest?.canTake ? (
              <div>
                <p className="text-green-400 font-semibold mb-4">
                  ✅ {t("canTakeNow", "Вы можете пройти тест", "Siz hozir test o'tishingiz mumkin")}
                </p>
                <Button
                  onClick={handleTakeTest}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg"
                >
                  {t("startTest", "Начать тест", "Testni boshlash")}
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-orange-400 font-semibold mb-2">
                  ⏳ {canTakeTest?.message}
                </p>
                <p className="text-gray-300 text-sm">
                  {t(
                    "monthlyLimit",
                    "Тест можно проходить один раз в месяц",
                    "Test oyiga bir marta o'tiladi"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Test History */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">
              {t("testHistory", "История тестов", "Test tarixi")}
            </h2>
          </div>

          {testResult ? (
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-purple-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">
                    {t("score", "Оценка", "Baho")}: {testResult.score}%
                  </span>
                  <span className="text-gray-400 text-sm">
                    {testResult.completedAt
                      ? new Date(testResult.completedAt).toLocaleDateString(
                          language === "ru" ? "ru-RU" : "uz-UZ"
                        )
                      : "-"}
                  </span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-400">
                    ✅ {testResult.correctCount} {t("correct", "правильно", "to'g'ri")}
                  </span>
                  <span className="text-red-400">
                    ❌ {testResult.incorrectCount} {t("incorrect", "неправильно", "noto'g'ri")}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-300">
              {t("noHistory", "История тестов пуста", "Test tarixi bo'sh")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
