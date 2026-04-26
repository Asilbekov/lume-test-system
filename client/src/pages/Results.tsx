import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Globe, Trophy, BarChart3 } from "lucide-react";

export default function Results() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // Mock data - will be replaced with real data from API
  const correctCount = 18;
  const incorrectCount = 2;
  const totalQuestions = 20;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { ru: "Отлично", uz: "A'lo", color: "text-green-400" };
    if (percentage >= 80) return { ru: "Хорошо", uz: "Yaxshi", color: "text-cyan-400" };
    if (percentage >= 70) return { ru: "Удовлетворительно", uz: "O'rtacha", color: "text-yellow-400" };
    return { ru: "Нужно улучшить", uz: "Yaxshilash kerak", color: "text-red-400" };
  };

  const grade = getGrade();

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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          {/* Trophy Icon */}
          <div className="text-center mb-8">
            <Trophy className="w-24 h-24 mx-auto text-yellow-400 drop-shadow-lg" />
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-cyan-500/30 shadow-2xl text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t("testComplete", "Тест завершен!", "Test yakunlandi!")}
            </h1>

            {/* Score Display */}
            <div className="my-12">
              <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 mb-4">
                {percentage}%
              </div>
              <p className={`text-3xl font-bold ${grade.color} mb-8`}>
                {language === "ru" ? grade.ru : grade.uz}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/50">
                <div className="text-3xl font-bold text-green-400">{correctCount}</div>
                <div className="text-sm text-green-200">
                  {t("correct", "Правильно", "To'g'ri")}
                </div>
              </div>
              <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/50">
                <div className="text-3xl font-bold text-red-400">{incorrectCount}</div>
                <div className="text-sm text-red-200">
                  {t("incorrect", "Неправильно", "Noto'g'ri")}
                </div>
              </div>
              <div className="bg-cyan-500/20 rounded-lg p-4 border border-cyan-500/50">
                <div className="text-3xl font-bold text-cyan-400">{totalQuestions}</div>
                <div className="text-sm text-cyan-200">
                  {t("total", "Всего", "Jami")}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white/5 rounded-lg p-6 mb-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-bold">{t("details", "Детали", "Tafsilotlar")}</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>
                  {t("answered", "Ответено вопросов", "Javob berilgan savollar")}: {totalQuestions}
                </p>
                <p>
                  {t("accuracy", "Точность", "Aniqlik")}: {percentage}%
                </p>
                <p>
                  {t("score", "Оценка", "Baho")}: {language === "ru" ? grade.ru : grade.uz}
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-300 mb-8">
              {percentage >= 80
                ? t(
                    "successMsg",
                    "Отличный результат! Вы хорошо знаете систему Lume.",
                    "Ajoyib natija! Siz Lume tizimini yaxshi bilasiz."
                  )
                : t(
                    "improvementMsg",
                    "Продолжайте обучение и улучшайте свои знания!",
                    "O'qishni davom ettiring va bilimingizni yaxshilang!"
                  )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              {t("backHome", "На главную", "Asosiy sahifaga")}
            </Button>
            <Button
              onClick={() => navigate("/admin")}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-teal-500/50 transition-all"
            >
              {t("viewLeaderboard", "Таблица лидеров", "Liderlar jadvali")}
            </Button>
          </div>

          {/* Note */}
          <p className="text-center text-gray-400 text-sm mt-8">
            {t(
              "note",
              "Тест можно пройти только один раз на этом аккаунте",
              "Bu hisob uchun test faqat bir marta o'tkazilishi mumkin"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
