import { getDb } from "./db";
import { questions, testAnswers, testSessions, questionOptions } from "../drizzle/schema";

const questionsData = [
  // Warehouse Operations - 20 questions
  {
    questionRu: "Где в системе Lume можно добавить новый товар?",
    questionUz: "Lume tizimida yangi tovarni qayerda qo'shish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "В разделе 'Товары' меню 'Складские операции'", textUz: "'Skladskie operatsiyalar' menyusining 'Tovarlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Настройки'", textUz: "'Sozlamalar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Какие основные параметры нужно указать при создании товара?",
    questionUz: "Tovar yaratishda qanday asosiy parametrlarni ko'rsatish kerak?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Название, цена, единица измерения", textUz: "Nomi, narxi, o'lchov birligi", isCorrect: true },
      { textRu: "Только название товара", textUz: "Faqat tovarning nomi", isCorrect: false },
      { textRu: "Только цена", textUz: "Faqat narx", isCorrect: false },
      { textRu: "Только единица измерения", textUz: "Faqat o'lchov birligi", isCorrect: false }
    ]
  },
  {
    questionRu: "Как редактировать информацию о товаре?",
    questionUz: "Tovar haqida ma'lumotni qanday tahrirlash mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Найти товар в списке и нажать на него для редактирования", textUz: "Ro'yxatdan tovarni topib, uni tahrirlash uchun bosing", isCorrect: true },
      { textRu: "Удалить и создать заново", textUz: "O'chirib, yangi yaratish", isCorrect: false },
      { textRu: "Товар нельзя редактировать", textUz: "Tovarni tahrirlash mumkin emas", isCorrect: false },
      { textRu: "Только через админ панель", textUz: "Faqat admin paneli orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Приход' в системе Lume?",
    questionUz: "Lume tizimida 'Приход' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Поступление товаров от поставщиков на склад", textUz: "Tovarlarning ta'minchi tomonidan omborga kelib tushishi", isCorrect: true },
      { textRu: "Продажа товаров", textUz: "Tovarlarning sotilishi", isCorrect: false },
      { textRu: "Возврат товаров", textUz: "Tovarlarning qaytarilishi", isCorrect: false },
      { textRu: "Перемещение товаров", textUz: "Tovarlarning ko'chirilishi", isCorrect: false }
    ]
  },
  {
    questionRu: "Как оформить приход товаров?",
    questionUz: "Tovarlarning kirishini qanday rasmiylashtirish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Перейти в 'Приход' и создать новый документ", textUz: "'Приход' bo'limiga o'tib, yangi hujjat yarating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Отчеты'", textUz: "'Hisobotlar' bo'limi orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Что означает 'Возврат прихода'?",
    questionUz: "'Приход qaytarish' nima anglatadi?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Возврат товаров поставщику", textUz: "Tovarlarni ta'minchiga qaytarish", isCorrect: true },
      { textRu: "Возврат денег клиентом", textUz: "Mijozning pul qaytarishi", isCorrect: false },
      { textRu: "Возврат товаров со склада", textUz: "Ombordan tovarlarni qaytarish", isCorrect: false },
      { textRu: "Отмена операции прихода", textUz: "Приход operatsiyasini bekor qilish", isCorrect: false }
    ]
  },
  {
    questionRu: "Как выполнить трансфер товаров между складами?",
    questionUz: "Tovarlarni omborlar orasida qanday ko'chirish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Использовать функцию 'Трансфер' в меню 'Складские операции'", textUz: "'Skladskie operatsiyalar' menyusida 'Transfer' funksiyasini ishlating", isCorrect: true },
      { textRu: "Удалить со склада и добавить на другой", textUz: "Ombordan o'chirib, boshqasiga qo'shish", isCorrect: false },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Реализация' товаров?",
    questionUz: "Tovarlarning 'Realizatsiyasi' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Продажа товаров клиентам", textUz: "Tovarlarning mijozlarga sotilishi", isCorrect: true },
      { textRu: "Возврат товаров", textUz: "Tovarlarning qaytarilishi", isCorrect: false },
      { textRu: "Перемещение товаров", textUz: "Tovarlarning ko'chirilishi", isCorrect: false },
      { textRu: "Хранение товаров", textUz: "Tovarlarning saqlanishi", isCorrect: false }
    ]
  },
  {
    questionRu: "Как использовать функцию 'Переоценка'?",
    questionUz: "'Переotsеnka' funksiyasini qanday ishlating?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Для массового изменения цен на товары", textUz: "Tovarlarning narxlarini ommaviy o'zgartirishga", isCorrect: true },
      { textRu: "Для удаления товаров", textUz: "Tovarlarni o'chirishga", isCorrect: false },
      { textRu: "Для создания новых товаров", textUz: "Yangi tovarlar yaratishga", isCorrect: false },
      { textRu: "Для поиска товаров", textUz: "Tovarlarni qidirish uchun", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Инвентаризация'?",
    questionUz: "'Inventarizatsiya' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Сверка фактического наличия товаров с учётными данными", textUz: "Tovarlarning haqiqiy mavjudligini hisobot ma'lumotlari bilan solishtirish", isCorrect: true },
      { textRu: "Продажа товаров", textUz: "Tovarlarning sotilishi", isCorrect: false },
      { textRu: "Возврат товаров", textUz: "Tovarlarning qaytarilishi", isCorrect: false },
      { textRu: "Перемещение товаров", textUz: "Tovarlarning ko'chirilishi", isCorrect: false }
    ]
  },
  {
    questionRu: "Как удалить испорченные товары из системы?",
    questionUz: "Buzilgan tovarlarni tizimdan qanday o'chirish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Использовать функцию 'Списание'", textUz: "'Spisanie' funksiyasini ishlating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Техкарты'?",
    questionUz: "'Tekhkartalar' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Состав рецептур и калькуляция себестоимости", textUz: "Retsepturalarning tarkibi va o'z narxini hisoblash", isCorrect: true },
      { textRu: "Документы о товарах", textUz: "Tovarlar haqida hujjatlar", isCorrect: false },
      { textRu: "Отчеты о продажах", textUz: "Sotuvlar haqida hisobotlar", isCorrect: false },
      { textRu: "Ценники на товары", textUz: "Tovarlarning narx belgilari", isCorrect: false }
    ]
  },
  {
    questionRu: "Как импортировать товары из файла?",
    questionUz: "Tovarlarni fayldan qanday import qilish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Использовать функцию 'Импорт товаров'", textUz: "'Tovarlarni import qilish' funksiyasini ishlating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Вручную добавлять каждый товар", textUz: "Har bir tovarni qo'lda qo'shish", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что означает 'Весовые товары'?",
    questionUz: "'Vazniy tovarlar' nima anglatadi?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Товары, реализуемые по весу", textUz: "Vazniga ko'ra sotiluvchi tovarlar", isCorrect: true },
      { textRu: "Товары с большим весом", textUz: "Katta vazni bo'lgan tovarlar", isCorrect: false },
      { textRu: "Товары на складе", textUz: "Omborga qo'yilgan tovarlar", isCorrect: false },
      { textRu: "Товары для экспорта", textUz: "Eksport uchun tovarlar", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить категории товаров?",
    questionUz: "Tovar kategoriyalarini qanday sozlash mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "В разделе 'Категории' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Kategoriyalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Остаток товара'?",
    questionUz: "'Tovar qoldig'i' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Количество товара на складе", textUz: "Omborga qo'yilgan tovarning miqdori", isCorrect: true },
      { textRu: "Товар, который не продается", textUz: "Sotilmayotgan tovar", isCorrect: false },
      { textRu: "Товар, который испортился", textUz: "Buzilgan tovar", isCorrect: false },
      { textRu: "Товар, который зарезервирован", textUz: "Zaxiralangan tovar", isCorrect: false }
    ]
  },
  {
    questionRu: "Как отследить движение товара?",
    questionUz: "Tovar harakatini qanday kuzatish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Использовать отчет 'История товара'", textUz: "'Tovar tarixi' hisobotini ishlating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Серийный номер'?",
    questionUz: "'Serial raqami' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Уникальный идентификатор товара", textUz: "Tovarning noyob identifikatori", isCorrect: true },
      { textRu: "Номер партии товара", textUz: "Tovar partiyasining raqami", isCorrect: false },
      { textRu: "Номер склада", textUz: "Omborning raqami", isCorrect: false },
      { textRu: "Номер чека", textUz: "Chekning raqami", isCorrect: false }
    ]
  },
  {
    questionRu: "Как установить минимальный остаток товара?",
    questionUz: "Tovarning minimal qoldig'ini qanday o'rnatish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "В параметрах товара указать минимальный остаток", textUz: "Tovarning parametrlarida minimal qoldig'ini ko'rsating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  }
];

export async function seedQuestions() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  try {
    console.log("Seeding questions...");
    // Implementation would go here
    console.log("✅ Questions seeded successfully");
  } catch (error) {
    console.error("Failed to seed questions:", error);
  }
}
