import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { useState } from "react";
import { Globe, AlertCircle, Lock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.loginAdmin.useMutation({
    onSuccess: (data) => {
      toast.success(t("adminLoginSuccess", "Добро пожаловать, администратор!", "Xush kelibsiz, admin!"));
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminId", data.admin?.id?.toString() || "");
      navigate("/admin");
    },
    onError: (err) => {
      setError(err.message || t("adminLoginError", "Ошибка входа администратора", "Admin kirish xatosi"));
      toast.error(err.message);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("fillFields", "Заполните все поля", "Barcha maydonlarni to'ldiring"));
      return;
    }

    loginMutation.mutate({ email, password });
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
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
          <div className="flex justify-center mb-4">
            <Lock className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            {t("adminLogin", "Вход администратора", "Admin kirishi")}
          </h1>
          <p className="text-gray-300 text-center mb-8">
            {t(
              "adminLoginDesc",
              "Только для администраторов системы",
              "Faqat tizim administratorlari uchun"
            )}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">
                {t("email", "Email", "Email")}
              </label>
              <Input
                type="email"
                placeholder={t("emailPlaceholder", "admin@example.com", "admin@example.com")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-purple-500/50 text-white placeholder:text-gray-400"
                disabled={loginMutation.isPending}
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
                className="bg-white/5 border-purple-500/50 text-white placeholder:text-gray-400"
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
              disabled={loginMutation.isPending || !email || !password}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all mt-6"
            >
              {loginMutation.isPending ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {t("loggingIn", "Вход...", "Kirilmoqda...")}
                </>
              ) : (
                t("adminLoginButton", "Войти как администратор", "Admin sifatida kirish")
              )}
            </Button>

            <div className="text-center mt-4">
              <p className="text-gray-300">
                {t("userLogin", "Обычный пользователь?", "Oddiy foydalanuvchi?")} 
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-purple-300 hover:text-purple-200 font-semibold ml-2"
                >
                  {t("userLoginLink", "Войти", "Kirish")}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
