import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { useState } from "react";
import { Globe } from "lucide-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // TODO: Call loginAdmin endpoint
      console.log("Admin Login:", { email, password });
      // navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-orange-900 relative overflow-hidden flex items-center justify-center">
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
        className="absolute top-6 left-6 text-white hover:text-teal-300 transition-colors"
      >
        ← {t("back", "Назад", "Orqaga")}
      </button>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-teal-500/30 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            {t("adminLogin", "Админ вход", "Admin kirish")}
          </h1>
          <p className="text-gray-300 text-center mb-8">
            {t(
              "adminLoginDesc",
              "Вход в админ панель",
              "Admin paneliga kirish"
            )}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">
                {t("email", "Email", "Email")}
              </label>
              <Input
                type="email"
                placeholder={t("emailPlaceholder", "admin@lume.uz", "admin@lume.uz")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-teal-500/50 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                {t("password", "Пароль", "Parol")}
              </label>
              <Input
                type="password"
                placeholder={t("passwordPlaceholder", "••••••••", "••••••••")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-teal-500/50 text-white placeholder:text-gray-400"
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-teal-500/50 transition-all mt-6"
            >
              {loading ? t("loading", "Загрузка...", "Yuklanmoqda...") : t("adminLogin", "Админ вход", "Admin kirish")}
            </Button>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate("/")}
                className="text-teal-300 hover:text-teal-200 font-semibold"
              >
                {t("backHome", "Вернуться на главную", "Asosiy sahifaga qaytish")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
