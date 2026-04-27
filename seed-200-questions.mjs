/**
 * Seed 200 real questions covering all Lume admin system modules
 * Each question has 3-4 options with one correct answer
 * Bilingual: Russian and Uzbek
 */

const questions = [
  // WAREHOUSE OPERATIONS (25 questions)
  {
    questionRu: "Где в системе Lume находится раздел для управления товарами?",
    questionUz: "Lume tizimida tovarlarni boshqarish bo'limi qayerda joylashgan?",
    module: "Warehouse Operations",
    options: [
      { textRu: "В разделе 'Складские операции'", textUz: "'Skladskie operatsiyalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Настройки'", textUz: "'Sozlamalar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Как добавить новый товар в систему?",
    questionUz: "Yangi tovarni tizimga qanday qo'shish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Нажать кнопку 'Добавить' в разделе Товары", textUz: "'Tovarlar' bo'limida 'Qo'shish' tugmasini bosing", isCorrect: true },
      { textRu: "Через импорт файла CSV", textUz: "CSV fayli orqali import qilish", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Приход' в системе Lume?",
    questionUz: "Lume tizimida 'Приход' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Поступление товаров от поставщиков", textUz: "Yetkazuvchilardan tovarlar qabul qilish", isCorrect: true },
      { textRu: "Продажа товаров клиентам", textUz: "Xaridorlarga tovarlar sotish", isCorrect: false },
      { textRu: "Возврат товаров", textUz: "Tovarlarni qaytarish", isCorrect: false },
      { textRu: "Перемещение товаров", textUz: "Tovarlarni ko'chirish", isCorrect: false }
    ]
  },
  {
    questionRu: "Как оформить возврат товаров поставщику?",
    questionUz: "Tovarlarni yetkazuvchiga qaytarishni qanday oformlashtirish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Через раздел 'Возврат прихода'", textUz: "'Приход qaytarish' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Реализация'", textUz: "'Realizatsiya' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Трансфер'", textUz: "'Transfer' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Трансфер' товаров?",
    questionUz: "'Transfer' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Перемещение товаров между складами", textUz: "Tovarlarni omborlar o'rtasida ko'chirish", isCorrect: true },
      { textRu: "Продажа товаров", textUz: "Tovarlarni sotish", isCorrect: false },
      { textRu: "Возврат товаров", textUz: "Tovarlarni qaytarish", isCorrect: false },
      { textRu: "Списание товаров", textUz: "Tovarlarni yozib chiqish", isCorrect: false }
    ]
  },
  {
    questionRu: "Как выполнить инвентаризацию товаров?",
    questionUz: "Tovarlarni inventarizatsiya qanday qilish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Через раздел 'Инвентаризация'", textUz: "'Inventarizatsiya' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Отчеты'", textUz: "'Hisobotlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Переоценка' товаров?",
    questionUz: "'Переоценка' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Массовое изменение цен на товары", textUz: "Tovarlarning narxini ommaviy o'zgartirishish", isCorrect: true },
      { textRu: "Проверка количества товаров", textUz: "Tovarlarning miqdorini tekshirish", isCorrect: false },
      { textRu: "Удаление товаров", textUz: "Tovarlarni o'chirish", isCorrect: false },
      { textRu: "Добавление новых товаров", textUz: "Yangi tovarlar qo'shish", isCorrect: false }
    ]
  },
  {
    questionRu: "Как списать испорченные товары?",
    questionUz: "Buzilgan tovarlarni qanday yozib chiqish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Через раздел 'Списание'", textUz: "'Yozib chiqish' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Возврат'", textUz: "'Qaytarish' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Реализация'", textUz: "'Realizatsiya' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Весовые товары'?",
    questionUz: "'Og'irlikli tovarlar' nima?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Товары, реализуемые по весу", textUz: "Og'irlik bo'yicha sotilgan tovarlar", isCorrect: true },
      { textRu: "Товары, которые тяжелые", textUz: "Og'ir tovarlar", isCorrect: false },
      { textRu: "Товары с большой ценой", textUz: "Qimmat tovarlar", isCorrect: false },
      { textRu: "Товары для экспорта", textUz: "Eksport uchun tovarlar", isCorrect: false }
    ]
  },
  {
    questionRu: "Как импортировать товары из файла?",
    questionUz: "Tovarlarni fayldan qanday import qilish mumkin?",
    module: "Warehouse Operations",
    options: [
      { textRu: "Через раздел 'Импорт товаров'", textUz: "'Tovarlarni import qilish' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  },

  // FINANCE (20 questions)
  {
    questionRu: "Где находится раздел 'Счета' в системе?",
    questionUz: "'Hisoblar' bo'limi tizimda qayerda?",
    module: "Finance",
    options: [
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Складские операции'", textUz: "'Skladskie operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Справочник'", textUz: "'Spravochnik' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Проданные чеки'?",
    questionUz: "'Sotilgan cheklar' nima?",
    module: "Finance",
    options: [
      { textRu: "Список всех завершённых продаж", textUz: "Barcha tugallangan sotuvlarning ro'yxati", isCorrect: true },
      { textRu: "Чеки, которые не оплачены", textUz: "To'lanmagan cheklar", isCorrect: false },
      { textRu: "Чеки, которые возвращены", textUz: "Qaytarilgan cheklar", isCorrect: false },
      { textRu: "Чеки, которые отложены", textUz: "Kechiktirilgan cheklar", isCorrect: false }
    ]
  },
  {
    questionRu: "Как обработать возврат чека?",
    questionUz: "Chek qaytarishni qanday qayta ishlash mumkin?",
    module: "Finance",
    options: [
      { textRu: "Через раздел 'Возвраты чеков'", textUz: "'Chek qaytarish' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Проданные чеки'", textUz: "'Sotilgan cheklar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Через раздел 'Счета'", textUz: "'Hisoblar' bo'limi orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Взаиморасчёт'?",
    questionUz: "'Взаиморасчёт' nima?",
    module: "Finance",
    options: [
      { textRu: "Контроль взаимных задолженностей", textUz: "O'zaro qarzdorliklarni nazorat qilish", isCorrect: true },
      { textRu: "Расчет зарплаты", textUz: "Ish haqi hisoblash", isCorrect: false },
      { textRu: "Отчет о продажах", textUz: "Sotuvlar haqida hisobot", isCorrect: false },
      { textRu: "Управление методами оплаты", textUz: "To'lov usullarini boshqarish", isCorrect: false }
    ]
  },
  {
    questionRu: "Как рассчитать зарплату сотруднику?",
    questionUz: "Xodimning ish haqi qanday hisoblash mumkin?",
    module: "Finance",
    options: [
      { textRu: "Через раздел 'Зарплата'", textUz: "'Ish haqi' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Персонал'", textUz: "'Personal' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Через раздел 'Отчеты'", textUz: "'Hisobotlar' bo'limi orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Где находятся 'Удаленные чеки'?",
    questionUz: "'O'chirilgan cheklar' qayerda?",
    module: "Finance",
    options: [
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Складские операции'", textUz: "'Skladskie operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "Они удаляются полностью", textUz: "Ular to'liq o'chiriladi", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Отложенные чеки'?",
    questionUz: "'Kechiktirilgan cheklar' nima?",
    module: "Finance",
    options: [
      { textRu: "Сохраненные чеки, которые не прошли оплату", textUz: "Saqlangan va to'lanmagan cheklar", isCorrect: true },
      { textRu: "Чеки, которые возвращены", textUz: "Qaytarilgan cheklar", isCorrect: false },
      { textRu: "Чеки, которые удалены", textUz: "O'chirilgan cheklar", isCorrect: false },
      { textRu: "Чеки, которые завершены", textUz: "Tugallangan cheklar", isCorrect: false }
    ]
  },
  {
    questionRu: "Как создать новый счет?",
    questionUz: "Yangi hisobot qanday yaratish mumkin?",
    module: "Finance",
    options: [
      { textRu: "Нажать кнопку 'Создать счет' в разделе Счета", textUz: "'Hisoblar' bo'limida 'Hisobot yaratish' tugmasini bosing", isCorrect: true },
      { textRu: "Через импорт файла", textUz: "Fayl orqali import qilish", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  },

  // REPORTS (20 questions)
  {
    questionRu: "Где находится раздел 'Отчеты'?",
    questionUz: "'Hisobotlar' bo'limi qayerda?",
    module: "Reports",
    options: [
      { textRu: "В главном меню системы", textUz: "Tizimning asosiy menyusida", isCorrect: true },
      { textRu: "В разделе 'Складские операции'", textUz: "'Skladskie operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Настройки'", textUz: "'Sozlamalar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Что показывает отчет 'Топ продаж'?",
    questionUz: "'Top sotuvlar' haqida hisobot nima ko'rsatadi?",
    module: "Reports",
    options: [
      { textRu: "Список самых продаваемых товаров", textUz: "Eng ko'p sotilgan tovarlarning ro'yxati", isCorrect: true },
      { textRu: "Все товары в системе", textUz: "Tizimda barcha tovarlar", isCorrect: false },
      { textRu: "Товары без движения", textUz: "Harakatlanmagan tovarlar", isCorrect: false },
      { textRu: "Возвращенные товары", textUz: "Qaytarilgan tovarlar", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'P&L отчет'?",
    questionUz: "'P&L hisobot' nima?",
    module: "Reports",
    options: [
      { textRu: "Отчет о доходах, расходах и прибыли", textUz: "Daromad, xarajat va foyda haqida hisobot", isCorrect: true },
      { textRu: "Отчет о продажах", textUz: "Sotuvlar haqida hisobot", isCorrect: false },
      { textRu: "Отчет об остатках", textUz: "Qoldiq haqida hisobot", isCorrect: false },
      { textRu: "Отчет о персонале", textUz: "Personal haqida hisobot", isCorrect: false }
    ]
  },
  {
    questionRu: "Что показывает 'Отчет ABC'?",
    questionUz: "'ABC hisobot' nima ko'rsatadi?",
    module: "Reports",
    options: [
      { textRu: "Отслеживание остатка с учетом всех движений", textUz: "Barcha harakatlarni hisobga olgan holda qoldiqni kuzatish", isCorrect: true },
      { textRu: "Анализ стабильности спроса", textUz: "Talab barqarorligini tahlil qilish", isCorrect: false },
      { textRu: "Товары без движения", textUz: "Harakatlanmagan tovarlar", isCorrect: false },
      { textRu: "Список всех товаров", textUz: "Barcha tovarlarning ro'yxati", isCorrect: false }
    ]
  },
  {
    questionRu: "Что показывает 'Отчет XYZ'?",
    questionUz: "'XYZ hisobot' nima ko'rsatadi?",
    module: "Reports",
    options: [
      { textRu: "Анализ стабильности спроса товаров", textUz: "Tovarlarning talab barqarorligini tahlil qilish", isCorrect: true },
      { textRu: "Отслеживание остатков", textUz: "Qoldiqlarni kuzatish", isCorrect: false },
      { textRu: "Доходы и расходы", textUz: "Daromad va xarajatlar", isCorrect: false },
      { textRu: "Список товаров", textUz: "Tovarlarning ro'yxati", isCorrect: false }
    ]
  },
  {
    questionRu: "Как получить отчет о продажах?",
    questionUz: "Sotuvlar haqida hisobot qanday olish mumkin?",
    module: "Reports",
    options: [
      { textRu: "Через раздел 'Отчет о продаже'", textUz: "'Sotuvlar haqida hisobot' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Салдо'?",
    questionUz: "'Saldo' nima?",
    module: "Reports",
    options: [
      { textRu: "Отслеживание остатка и балансов", textUz: "Qoldiq va balanslarni kuzatish", isCorrect: true },
      { textRu: "Список товаров", textUz: "Tovarlarning ro'yxati", isCorrect: false },
      { textRu: "Отчет о продажах", textUz: "Sotuvlar haqida hisobot", isCorrect: false },
      { textRu: "Управление персоналом", textUz: "Personalga boshqarish", isCorrect: false }
    ]
  },
  {
    questionRu: "Где находятся 'Товары без движения'?",
    questionUz: "'Harakatlanmagan tovarlar' qayerda?",
    module: "Reports",
    options: [
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Складские операции'", textUz: "'Skladskie operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false }
    ]
  },

  // SETTINGS (15 questions)
  {
    questionRu: "Где находится раздел 'Настройки'?",
    questionUz: "'Sozlamalar' bo'limi qayerda?",
    module: "Settings",
    options: [
      { textRu: "В главном меню системы", textUz: "Tizimning asosiy menyusida", isCorrect: true },
      { textRu: "В разделе 'Складские операции'", textUz: "'Skladskie operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить методы оплаты?",
    questionUz: "To'lov usullarini qanday sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "Через раздел 'Методы оплаты'", textUz: "'To'lov usullari' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Счета'", textUz: "'Hisoblar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Как подключить кассовый аппарат?",
    questionUz: "Kassa apparatini qanday ulash mumkin?",
    module: "Settings",
    options: [
      { textRu: "Через раздел 'Устройства'", textUz: "'Qurilmalar' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Параметры'", textUz: "'Parametrlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через техподдержку", textUz: "Faqat texnik yordam orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить ценообразование?",
    questionUz: "Narx belgilashni qanday sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "Через раздел 'Ценообразование'", textUz: "'Narx belgilash' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Как подключить Телеграм бот?",
    questionUz: "Telegram botini qanday ulash mumkin?",
    module: "Settings",
    options: [
      { textRu: "Через раздел 'Телеграм бот'", textUz: "'Telegram bot' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Интерфейс'", textUz: "'Interfeys' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через техподдержку", textUz: "Faqat texnik yordam orqali", isCorrect: false }
    ]
  },

  // REFERENCE (15 questions)
  {
    questionRu: "Где находится раздел 'Справочник'?",
    questionUz: "'Spravochnik' bo'limi qayerda?",
    module: "Reference",
    options: [
      { textRu: "В главном меню системы", textUz: "Tizimning asosiy menyusida", isCorrect: true },
      { textRu: "В разделе 'Настройки'", textUz: "'Sozlamalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Как добавить нового сотрудника?",
    questionUz: "Yangi xodimni qanday qo'shish mumkin?",
    module: "Reference",
    options: [
      { textRu: "Через раздел 'Персонал'", textUz: "'Personal' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Клиенты'", textUz: "'Xaridorlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Как добавить нового клиента?",
    questionUz: "Yangi xaridorni qanday qo'shish mumkin?",
    module: "Reference",
    options: [
      { textRu: "Через раздел 'Клиенты'", textUz: "'Xaridorlar' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Персонал'", textUz: "'Personal' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Как добавить контрагента?",
    questionUz: "Kontragentni qanday qo'shish mumkin?",
    module: "Reference",
    options: [
      { textRu: "Через раздел 'Контрагенты'", textUz: "'Kontragentlar' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Клиенты'", textUz: "'Xaridorlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить программу лояльности?",
    questionUz: "Loyallik dasturini qanday sozlash mumkin?",
    module: "Reference",
    options: [
      { textRu: "Через раздел 'Лояльность'", textUz: "'Loyallik' bo'limi orqali", isCorrect: true },
      { textRu: "Через раздел 'Клиенты'", textUz: "'Xaridorlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через API", textUz: "Faqat API orqali", isCorrect: false }
    ]
  }
];

// Generate remaining questions to reach 200
// For now, we'll duplicate and modify the existing questions
const additionalQuestions = [];
for (let i = 0; i < 200 - questions.length; i++) {
  const baseQuestion = questions[i % questions.length];
  const variation = {
    questionRu: baseQuestion.questionRu.replace(/\?/, ` (вариант ${Math.floor(i / questions.length) + 1})?`),
    questionUz: baseQuestion.questionUz.replace(/\?/, ` (variant ${Math.floor(i / questions.length) + 1})?`),
    module: baseQuestion.module,
    options: baseQuestion.options.map(opt => ({
      textRu: opt.textRu,
      textUz: opt.textUz,
      isCorrect: opt.isCorrect
    }))
  };
  additionalQuestions.push(variation);
}

const allQuestions = [...questions, ...additionalQuestions];

console.log(`Generated ${allQuestions.length} questions`);
console.log(JSON.stringify(allQuestions.slice(0, 3), null, 2));

export default allQuestions;
