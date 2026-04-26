import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { useState } from "react";
import { Globe } from "lucide-react";

export default function Login() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // TODO: Call loginUser endpoint
      console.log("Login:", { email, name });
      // navigate("/test");
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
        className="absolute top-6 left-6 text-white hover:text-cyan-300 transition-colors"
      >
        ← {t("back", "Назад", "Orqaga")}
      </button>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            {t("login", "Вход", "Kirish")}
          </h1>
          <p className="text-gray-300 text-center mb-8">
            {t(
              "loginDesc",
              "Введите ваш email и имя для входа",
              "Kirishni amalga oshirish uchun email va ismingizni kiriting"
            )}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">
                {t("email", "Email", "Email")}
              </label>
              <Input
                type="email"
                placeholder={t("emailPlaceholder", "your@email.com", "sizning@email.com")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-orange-500/50 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                {t("name", "Имя", "Ism")}
              </label>
              <Input
                type="text"
                placeholder={t("namePlaceholder", "Ваше имя", "Sizning ismingiz")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-orange-500/50 text-white placeholder:text-gray-400"
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={loading || !email || !name}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-orange-500/50 transition-all mt-6"
            >
              {loading ? t("loading", "Загрузка...", "Yuklanmoqda...") : t("login", "Вход", "Kirish")}
            </Button>

            <div className="text-center mt-4">
              <p className="text-gray-300">
                {t("noAccount", "Нет аккаунта?", "Hisob yo'qmi?")} 
                <button
                  onClick={() => navigate("/register")}
                  className="text-orange-300 hover:text-orange-200 font-semibold ml-2"
                >
                  {t("register", "Регистрация", "Ro'yxatdan o'tish")}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
