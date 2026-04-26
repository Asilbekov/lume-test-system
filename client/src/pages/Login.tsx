import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { useState } from "react";
import { Globe, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Login() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.loginUser.useMutation({
    onSuccess: (data) => {
      toast.success(t("loginSuccess", "Добро пожаловать!", "Xush kelibsiz!"));
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.user?.id?.toString() || "");
      navigate("/test");
    },
    onError: (err) => {
      setError(err.message || t("loginError", "Ошибка входа", "Kirish xatosi"));
      toast.error(err.message);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !name) {
      setError(t("fillFields", "Заполните все поля", "Barcha maydonlarni to'ldiring"));
      return;
    }

    loginMutation.mutate({ email, name });
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

          <form onSubmit={handleLogin} className="space-y-4">
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
                disabled={loginMutation.isPending}
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
                disabled={loginMutation.isPending}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex gap-2 items-start">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loginMutation.isPending || !email || !name}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-orange-500/50 transition-all mt-6"
            >
              {loginMutation.isPending ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {t("loggingIn", "Вход...", "Kirilmoqda...")}
                </>
              ) : (
                t("loginButton", "Войти", "Kirish")
              )}
            </Button>

            <div className="text-center mt-4">
              <p className="text-gray-300">
                {t("noAccount", "Нет аккаунта?", "Hisob yo'qmi?")} 
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-orange-300 hover:text-orange-200 font-semibold ml-2"
                >
                  {t("register", "Регистрация", "Ro'yxatdan o'tish")}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
