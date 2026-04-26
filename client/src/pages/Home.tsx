import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Globe } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-orange-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {t("title", "LUME", "LUME")}
            </h1>
            <h2 className="text-3xl font-bold text-cyan-300 drop-shadow-lg">
              {t("subtitle", "Система тестирования", "Sinov tizimi")}
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-200 mb-12 leading-relaxed">
            {t(
              "description",
              "Проверьте свои знания о системе управления Lume. Пройдите тест и узнайте свой уровень владения платформой.",
              "Lume boshqaruv tizimi haqida bilimingizni tekshiring. Testdan o'ting va platformani egallash darajangizni bilib oling."
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              {t("register", "Регистрация", "Ro'yxatdan o'tish")}
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              {t("login", "Вход", "Kirish")}
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/admin-login")}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-teal-500/50 transition-all"
            >
              {t("adminLogin", "Админ вход", "Admin kirish")}
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-cyan-500/30">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-white font-bold mb-2">
                {t("feature1", "200 вопросов", "200 savol")}
              </h3>
              <p className="text-gray-300 text-sm">
                {t(
                  "feature1desc",
                  "Полное покрытие всех модулей Lume",
                  "Lume barcha modullarini to'liq qamrab oladi"
                )}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-orange-500/30">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-bold mb-2">
                {t("feature2", "Один раз", "Bir marta")}
              </h3>
              <p className="text-gray-300 text-sm">
                {t(
                  "feature2desc",
                  "Тест можно пройти только один раз",
                  "Test faqat bir marta o'tkazilishi mumkin"
                )}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-teal-500/30">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-white font-bold mb-2">
                {t("feature3", "Результаты", "Natijalar")}
              </h3>
              <p className="text-gray-300 text-sm">
                {t(
                  "feature3desc",
                  "Мгновенная обратная связь и статистика",
                  "Tezkor fikr-mulohaza va statistika"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated CSS */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
