import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Globe, CheckCircle, XCircle } from "lucide-react";

export default function Test() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // Mock questions - will be replaced with real data from API
  const mockQuestions = [
    {
      id: 1,
      questionRu: "Где находится раздел 'Товары'?",
      questionUz: "'Tovarlar' bo'limi qayerda joylashgan?",
      screenshot: "https://via.placeholder.com/400x300?text=Lume+Dashboard",
      options: [
        { id: 1, textRu: "В меню 'Складские операции'", textUz: "'Skladskie operatsiyalar' menyusida", isCorrect: true },
        { id: 2, textRu: "В меню 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' menyusida", isCorrect: false },
        { id: 3, textRu: "В меню 'Отчеты'", textUz: "'Hisobotlar' menyusida", isCorrect: false },
        { id: 4, textRu: "В меню 'Настройки'", textUz: "'Sozlamalar' menyusida", isCorrect: false }
      ]
    },
    {
      id: 2,
      questionRu: "Как добавить новый товар?",
      questionUz: "Yangi tovarni qanday qo'shish mumkin?",
      screenshot: "https://via.placeholder.com/400x300?text=Add+Product",
      options: [
        { id: 5, textRu: "Нажать кнопку 'Добавить'", textUz: "'Qo'shish' tugmasini bosing", isCorrect: true },
        { id: 6, textRu: "Через импорт файла", textUz: "Fayl orqali import qilish", isCorrect: false },
        { id: 7, textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
        { id: 8, textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
      ]
    }
  ];

  const handleSelectOption = (optionId: number, isCorrect: boolean) => {
    setAnswers({ ...answers, [currentQuestion]: optionId });
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results");
    }
  };

  const question = mockQuestions[currentQuestion];
  const selectedOptionId = answers[currentQuestion];

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

      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white">
            <h1 className="font-bold text-xl">
              {t("test", "Тест", "Sinov")} {currentQuestion + 1}/{mockQuestions.length}
            </h1>
          </div>
          <div className="flex gap-6 text-white font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>{correctCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span>{incorrectCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8 bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-orange-500 h-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30 shadow-2xl mb-8">
          {/* Screenshot */}
          <div className="mb-8 rounded-lg overflow-hidden border border-white/20">
            <img
              src={question.screenshot}
              alt="Question context"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Question Text */}
          <h2 className="text-2xl font-bold text-white mb-8">
            {language === "ru" ? question.questionRu : question.questionUz}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id, option.isCorrect)}
                disabled={selectedOptionId !== undefined}
                className={`w-full p-4 rounded-lg text-left font-semibold transition-all ${
                  selectedOptionId === option.id
                    ? option.isCorrect
                      ? "bg-green-500/30 border-2 border-green-500 text-green-100"
                      : "bg-red-500/30 border-2 border-red-500 text-red-100"
                    : selectedOptionId !== undefined && option.isCorrect
                    ? "bg-green-500/20 border-2 border-green-500/50 text-green-100"
                    : "bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 hover:border-cyan-500/50"
                }`}
              >
                {language === "ru" ? option.textRu : option.textUz}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="text-white hover:text-cyan-300 disabled:text-gray-500 transition-colors"
          >
            ← {t("previous", "Предыдущий", "Oldingi")}
          </button>
          <Button
            onClick={handleNext}
            disabled={selectedOptionId === undefined}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            {currentQuestion === mockQuestions.length - 1
              ? t("finish", "Завершить", "Yakunlash")
              : t("next", "Далее", "Keyingi")}
          </Button>
        </div>
      </div>
    </div>
  );
}
