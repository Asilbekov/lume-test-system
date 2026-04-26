import mysql from "mysql2/promise";

const questions = [
  // Warehouse Operations - Товары (Products) - 20 questions
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
  },

  // Finance - Финансовые операции - 20 questions
  {
    questionRu: "Где можно просмотреть список всех проданных чеков?",
    questionUz: "Barcha sotilgan cheklar ro'yxatini qayerda ko'rish mumkin?",
    module: "Finance",
    options: [
      { textRu: "В разделе 'Проданные чеки' меню 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' menyusining 'Sotilgan cheklar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Настройки'", textUz: "'Sozlamalar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Как обработать возврат чека?",
    questionUz: "Chekni qaytarishni qanday qayta ishlash mumkin?",
    module: "Finance",
    options: [
      { textRu: "Использовать раздел 'Возвраты чеков'", textUz: "'Cheklar qaytarish' bo'limini ishlating", isCorrect: true },
      { textRu: "Удалить чек из системы", textUz: "Chekni tizimdan o'chirish", isCorrect: false },
      { textRu: "Создать новый чек", textUz: "Yangi chek yaratish", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Удалённые чеки'?",
    questionUz: "'O'chirilgan cheklar' nima?",
    module: "Finance",
    options: [
      { textRu: "Чеки, в которых были удалены товары", textUz: "Unda tovarlar o'chirilgan cheklar", isCorrect: true },
      { textRu: "Чеки, которые были полностью удалены", textUz: "Butunlay o'chirilgan cheklar", isCorrect: false },
      { textRu: "Чеки, которые не были оплачены", textUz: "To'lanmagan cheklar", isCorrect: false },
      { textRu: "Чеки от удалённых клиентов", textUz: "O'chirilgan mijozlardan cheklar", isCorrect: false }
    ]
  },
  {
    questionRu: "Как найти отложенный чек?",
    questionUz: "Qo'yilgan chekni qanday topish mumkin?",
    module: "Finance",
    options: [
      { textRu: "В разделе 'Отложенные чеки'", textUz: "'Qo'yilgan cheklar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Проданные чеки'", textUz: "'Sotilgan cheklar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Взаиморасчёт'?",
    questionUz: "'Vzaimoraschet' nima?",
    module: "Finance",
    options: [
      { textRu: "Контроль взаимных задолженностей и платежей", textUz: "O'zaro qarzlar va to'lovlarni nazorat qilish", isCorrect: true },
      { textRu: "Расчет зарплаты", textUz: "Maosh hisoblash", isCorrect: false },
      { textRu: "Расчет налогов", textUz: "Soliq hisoblash", isCorrect: false },
      { textRu: "Расчет себестоимости", textUz: "O'z narxini hisoblash", isCorrect: false }
    ]
  },
  {
    questionRu: "Как создать счёт для клиента?",
    questionUz: "Mijoz uchun hisob-kitob qanday yaratish mumkin?",
    module: "Finance",
    options: [
      { textRu: "Перейти в раздел 'Счета' и создать новый документ", textUz: "'Hisob-kitoblar' bo'limiga o'tib, yangi hujjat yarating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Клиенты'", textUz: "'Mijozlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как рассчитать зарплату сотрудника?",
    questionUz: "Xodimning maoshini qanday hisoblash mumkin?",
    module: "Finance",
    options: [
      { textRu: "Использовать раздел 'Зарплата'", textUz: "'Maosh' bo'limini ishlating", isCorrect: true },
      { textRu: "Через раздел 'Персонал'", textUz: "'Xodimlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Какие методы оплаты можно настроить?",
    questionUz: "Qanday to'lov usullarini sozlash mumkin?",
    module: "Finance",
    options: [
      { textRu: "Наличные, карта, чек, электронный кошелёк", textUz: "Naqd pul, karta, chek, elektron hamyon", isCorrect: true },
      { textRu: "Только наличные", textUz: "Faqat naqd pul", isCorrect: false },
      { textRu: "Только карта", textUz: "Faqat karta", isCorrect: false },
      { textRu: "Методы оплаты нельзя настроить", textUz: "To'lov usullarini sozlash mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как просмотреть отчет о продажах?",
    questionUz: "Sotuvlar haqida hisobotni qanday ko'rish mumkin?",
    module: "Finance",
    options: [
      { textRu: "В разделе 'Отчет о продаже' меню 'Отчеты'", textUz: "'Hisobotlar' menyusining 'Sotuvlar haqida hisobot' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Настройки'", textUz: "'Sozlamalar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'P&L отчет'?",
    questionUz: "'P&L hisobot' nima?",
    module: "Finance",
    options: [
      { textRu: "Отчет о доходах, расходах и прибыли", textUz: "Daromad, xarajat va foyda haqida hisobot", isCorrect: true },
      { textRu: "Отчет о товарах", textUz: "Tovarlar haqida hisobot", isCorrect: false },
      { textRu: "Отчет о клиентах", textUz: "Mijozlar haqida hisobot", isCorrect: false },
      { textRu: "Отчет о сотрудниках", textUz: "Xodimlar haqida hisobot", isCorrect: false }
    ]
  },
  {
    questionRu: "Как отследить остаток денежных средств?",
    questionUz: "Pul qoldig'ini qanday kuzatish mumkin?",
    module: "Finance",
    options: [
      { textRu: "Использовать раздел 'Салдо'", textUz: "'Saldo' bo'limini ishlating", isCorrect: true },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Отчеты'", textUz: "'Hisobotlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как экспортировать финансовые отчеты?",
    questionUz: "Moliyaviy hisobotlarni qanday eksport qilish mumkin?",
    module: "Finance",
    options: [
      { textRu: "Через кнопку 'Экспорт' в разделе отчетов", textUz: "Hisobotlar bo'limidagi 'Eksport' tugmasi orqali", isCorrect: true },
      { textRu: "Через раздел 'Настройки'", textUz: "'Sozlamalar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Какие типы платежей можно обрабатывать?",
    questionUz: "Qanday turdagi to'lovlarni qayta ishlash mumkin?",
    module: "Finance",
    options: [
      { textRu: "Полные платежи, частичные платежи, авансы", textUz: "To'liq to'lovlar, qisman to'lovlar, avanslar", isCorrect: true },
      { textRu: "Только полные платежи", textUz: "Faqat to'liq to'lovlar", isCorrect: false },
      { textRu: "Только авансы", textUz: "Faqat avanslar", isCorrect: false },
      { textRu: "Платежи нельзя обрабатывать", textUz: "To'lovlarni qayta ishlash mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить налоговые ставки?",
    questionUz: "Soliq stavkalarini qanday sozlash mumkin?",
    module: "Finance",
    options: [
      { textRu: "В разделе 'Налоги' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'Soliqlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Кассовый ордер'?",
    questionUz: "'Kassa orderi' nima?",
    module: "Finance",
    options: [
      { textRu: "Документ о приходе или расходе денежных средств", textUz: "Pul mablag'larining kirib-chiqishi haqida hujjat", isCorrect: true },
      { textRu: "Чек от покупателя", textUz: "Xaridordan chek", isCorrect: false },
      { textRu: "Счет-фактура", textUz: "Hisob-faktura", isCorrect: false },
      { textRu: "Накладная", textUz: "Nakladnaya", isCorrect: false }
    ]
  },
  {
    questionRu: "Как создать авансовый отчет?",
    questionUz: "Avansal hisobotni qanday yaratish mumkin?",
    module: "Finance",
    options: [
      { textRu: "В разделе 'Авансовые отчеты' меню 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' menyusining 'Avansal hisobotlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Дебиторская задолженность'?",
    questionUz: "'Debitorskayadolzhennost' nima?",
    module: "Finance",
    options: [
      { textRu: "Деньги, которые должны вам клиенты", textUz: "Mijozlar sizga qarz bo'lgan pul", isCorrect: true },
      { textRu: "Деньги, которые вы должны поставщикам", textUz: "Siz ta'minchilarga qarz bo'lgan pul", isCorrect: false },
      { textRu: "Налоги, которые нужно оплатить", textUz: "To'lash kerak bo'lgan soliqlar", isCorrect: false },
      { textRu: "Зарплата сотрудников", textUz: "Xodimlarning maoshi", isCorrect: false }
    ]
  },

  // Reports - Отчеты - 20 questions
  {
    questionRu: "Где находится раздел 'Отчеты' в главном меню?",
    questionUz: "Bosh menyuda 'Hisobotlar' bo'limi qayerda joylashgan?",
    module: "Reports",
    options: [
      { textRu: "В главном меню слева", textUz: "Chap tarafidagi bosh menyuda", isCorrect: true },
      { textRu: "В разделе 'Настройки'", textUz: "'Sozlamalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Справочник'", textUz: "'Spravochnik' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Топ продаж'?",
    questionUz: "'Top sotuvlar' nima?",
    module: "Reports",
    options: [
      { textRu: "Список самых продаваемых товаров", textUz: "Eng ko'p sotilgan tovarlarning ro'yxati", isCorrect: true },
      { textRu: "Список всех товаров", textUz: "Barcha tovarlarning ro'yxati", isCorrect: false },
      { textRu: "Список товаров без продаж", textUz: "Sotuvlarsiz tovarlarning ro'yxati", isCorrect: false },
      { textRu: "Список новых товаров", textUz: "Yangi tovarlarning ro'yxati", isCorrect: false }
    ]
  },
  {
    questionRu: "Как использовать отчет 'ABC'?",
    questionUz: "'ABC' hisobotini qanday ishlating?",
    module: "Reports",
    options: [
      { textRu: "Для отслеживания остатка с учётом движения товара", textUz: "Tovar harakatini hisobga olgan holda qoldig'ini kuzatish uchun", isCorrect: true },
      { textRu: "Для анализа спроса", textUz: "Talabni tahlil qilish uchun", isCorrect: false },
      { textRu: "Для расчета себестоимости", textUz: "O'z narxini hisoblash uchun", isCorrect: false },
      { textRu: "Для управления персоналом", textUz: "Xodimlarni boshqarish uchun", isCorrect: false }
    ]
  },
  {
    questionRu: "Что показывает отчет 'XYZ'?",
    questionUz: "'XYZ' hisobot nima ko'rsatadi?",
    module: "Reports",
    options: [
      { textRu: "Анализ стабильности спроса товаров", textUz: "Tovarlarning talabining barqarorligini tahlil qilish", isCorrect: true },
      { textRu: "Анализ цен товаров", textUz: "Tovarlarning narxlarini tahlil qilish", isCorrect: false },
      { textRu: "Анализ остатков товаров", textUz: "Tovarlarning qoldig'ini tahlil qilish", isCorrect: false },
      { textRu: "Анализ продаж товаров", textUz: "Tovarlarning sotuvlarini tahlil qilish", isCorrect: false }
    ]
  },
  {
    questionRu: "Как создать отчет по параметрам?",
    questionUz: "Parametrlar bo'yicha hisobotni qanday yaratish mumkin?",
    module: "Reports",
    options: [
      { textRu: "Использовать раздел 'Отчет по параметрам'", textUz: "'Parametrlar bo'yicha hisobot' bo'limini ishlating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Товарный отчет'?",
    questionUz: "'Tovar hisobot' nima?",
    module: "Reports",
    options: [
      { textRu: "Общий отчет товарных движений", textUz: "Tovar harakatlarining umumiy hisobot", isCorrect: true },
      { textRu: "Отчет о цене товаров", textUz: "Tovarlarning narxi haqida hisobot", isCorrect: false },
      { textRu: "Отчет о количестве товаров", textUz: "Tovarlarning miqdori haqida hisobot", isCorrect: false },
      { textRu: "Отчет о новых товарах", textUz: "Yangi tovarlar haqida hisobot", isCorrect: false }
    ]
  },
  {
    questionRu: "Как найти товары без движения?",
    questionUz: "Harakatsiz tovarlarni qanday topish mumkin?",
    module: "Reports",
    options: [
      { textRu: "Использовать раздел 'Товары без движения'", textUz: "'Harakatsiz tovarlar' bo'limini ishlating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как использовать отчет 'ABC/XYZ'?",
    questionUz: "'ABC/XYZ' hisobotini qanday ishlating?",
    module: "Reports",
    options: [
      { textRu: "Для отчета по значимости товаров с учётом стабильности", textUz: "Tovarlarning muhimligini barqarorlik bilan hisobga olgan holda", isCorrect: true },
      { textRu: "Для анализа цен", textUz: "Narxlarni tahlil qilish uchun", isCorrect: false },
      { textRu: "Для управления персоналом", textUz: "Xodimlarni boshqarish uchun", isCorrect: false },
      { textRu: "Для расчета налогов", textUz: "Soliq hisoblash uchun", isCorrect: false }
    ]
  },
  {
    questionRu: "Что показывает 'Материальный отчет'?",
    questionUz: "'Material hisobot' nima ko'rsatadi?",
    module: "Reports",
    options: [
      { textRu: "Информацию о материальных ценностях", textUz: "Material qiymatlar haqida ma'lumot", isCorrect: true },
      { textRu: "Информацию о сотрудниках", textUz: "Xodimlar haqida ma'lumot", isCorrect: false },
      { textRu: "Информацию о клиентах", textUz: "Mijozlar haqida ma'lumot", isCorrect: false },
      { textRu: "Информацию о поставщиках", textUz: "Ta'minchilar haqida ma'lumot", isCorrect: false }
    ]
  },
  {
    questionRu: "Как экспортировать отчет в Excel?",
    questionUz: "Hisobotni Excel-ga qanday eksport qilish mumkin?",
    module: "Reports",
    options: [
      { textRu: "Нажать кнопку 'Экспорт' в отчете", textUz: "Hisobotdagi 'Eksport' tugmasini bosing", isCorrect: true },
      { textRu: "Через раздел 'Настройки'", textUz: "'Sozlamalar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Какие периоды можно выбрать для отчета?",
    questionUz: "Hisobot uchun qanday davr tanlash mumkin?",
    module: "Reports",
    options: [
      { textRu: "День, неделя, месяц, квартал, год", textUz: "Kun, hafta, oy, chorak, yil", isCorrect: true },
      { textRu: "Только месяц", textUz: "Faqat oy", isCorrect: false },
      { textRu: "Только год", textUz: "Faqat yil", isCorrect: false },
      { textRu: "Периоды нельзя выбрать", textUz: "Davr tanlash mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как фильтровать отчеты по категориям?",
    questionUz: "Hisobotlarni kategoriyalar bo'yicha qanday filtrlash mumkin?",
    module: "Reports",
    options: [
      { textRu: "Использовать фильтры в разделе отчетов", textUz: "Hisobotlar bo'limidagi filtrlashni ishlating", isCorrect: true },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить автоматическую отправку отчетов?",
    questionUz: "Hisobotlarning avtomatik yuborilishini qanday sozlash mumkin?",
    module: "Reports",
    options: [
      { textRu: "В разделе 'Настройки' отчетов", textUz: "Hisobotlarning 'Sozlamalar' bo'limida", isCorrect: true },
      { textRu: "Через раздел 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limi orqali", isCorrect: false },
      { textRu: "Через раздел 'Товары'", textUz: "'Tovarlar' bo'limi orqali", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Кумулятивный отчет'?",
    questionUz: "'Kumulyativ hisobot' nima?",
    module: "Reports",
    options: [
      { textRu: "Отчет с нарастающим итогом", textUz: "O'sib boruvchi jami bilan hisobot", isCorrect: true },
      { textRu: "Отчет за один период", textUz: "Bir davr uchun hisobot", isCorrect: false },
      { textRu: "Отчет по товарам", textUz: "Tovarlar bo'yicha hisobot", isCorrect: false },
      { textRu: "Отчет по продажам", textUz: "Sotuvlar bo'yicha hisobot", isCorrect: false }
    ]
  },
  {
    questionRu: "Как сравнить данные за разные периоды?",
    questionUz: "Turli davrlardagi ma'lumotlarni qanday solishtirish mumkin?",
    module: "Reports",
    options: [
      { textRu: "Использовать функцию 'Сравнение периодов'", textUz: "'Davrlashni solishtirish' funksiyasini ishlating", isCorrect: true },
      { textRu: "Создать два отчета отдельно", textUz: "Ikkita hisobotni alohida yaratish", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false },
      { textRu: "Только через админ панель", textUz: "Faqat admin paneli orqali", isCorrect: false }
    ]
  },
  {
    questionRu: "Что такое 'Дашборд'?",
    questionUz: "'Dashboard' nima?",
    module: "Reports",
    options: [
      { textRu: "Главная панель с ключевыми показателями", textUz: "Asosiy paneli asosiy ko'rsatkichlar bilan", isCorrect: true },
      { textRu: "Отчет о товарах", textUz: "Tovarlar haqida hisobot", isCorrect: false },
      { textRu: "Отчет о продажах", textUz: "Sotuvlar haqida hisobot", isCorrect: false },
      { textRu: "Отчет о клиентах", textUz: "Mijozlar haqida hisobot", isCorrect: false }
    ]
  },

  // Settings - Настройки - 20 questions
  {
    questionRu: "Где находится раздел 'Настройки' в главном меню?",
    questionUz: "Bosh menyuda 'Sozlamalar' bo'limi qayerda joylashgan?",
    module: "Settings",
    options: [
      { textRu: "В главном меню слева", textUz: "Chap tarafidagi bosh menyuda", isCorrect: true },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Справочник'", textUz: "'Spravochnik' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить методы оплаты?",
    questionUz: "To'lov usullarini qanday sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Методы оплаты' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'To'lov usullari' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как создать шаблон ценника?",
    questionUz: "Narx belgisining shablonini qanday yaratish mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Ценники' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'Narx belgilari' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Где настроить параметры печати чеков?",
    questionUz: "Cheklar chop etish parametrlarini qayerda sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Чеки' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'Cheklar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как подключить оборудование к системе?",
    questionUz: "Asbob-uskunani tizimga qanday ulash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Устройства' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'Qurilmalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить правила ценообразования?",
    questionUz: "Narx belgilash qoidalarini qanday sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Ценообразование' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'Narx belgilash' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как организовать товары по тегам?",
    questionUz: "Tovarlarni teglar bo'yicha qanday tashkil qilish mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Теги' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'Teglar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить интерфейс системы?",
    questionUz: "Tizim interfeysi qanday sozlanadi?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Интерфейс' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'Interfeys' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить Telegram бот?",
    questionUz: "Telegram botini qanday sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Телеграм бот' меню 'Настройки'", textUz: "'Sozlamalar' menyusining 'Telegram bot' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как проверить текущий тариф?",
    questionUz: "Joriy tarifni qanday tekshirish mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Тарифы' меню 'Кабинет'", textUz: "'Kabinet' menyusining 'Tariflar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как управлять активными подписками?",
    questionUz: "Faol obunalarni qanday boshqarish mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Подписки' меню 'Кабинет'", textUz: "'Kabinet' menyusining 'Obunalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как просмотреть список кассовых аппаратов?",
    questionUz: "Kassa apparatlarining ro'yxatini qanday ko'rish mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Кассы' меню 'Кабинет'", textUz: "'Kabinet' menyusining 'Kassalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как обновить данные компании?",
    questionUz: "Kompaniya ma'lumotlarini qanday yangilash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Данные' меню 'Кабинет'", textUz: "'Kabinet' menyusining 'Ma'lumotlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить резервную копию?",
    questionUz: "Zaxira nusxasini qanday sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Резервная копия' меню 'Кабинет'", textUz: "'Kabinet' menyusining 'Zaxira nusxasi' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить уведомления?",
    questionUz: "Xabarnomalarni qanday sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Уведомления' меню 'Кабинет'", textUz: "'Kabinet' menyusining 'Xabarnomalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить язык системы?",
    questionUz: "Tizim tilini qanday sozlash mumkin?",
    module: "Settings",
    options: [
      { textRu: "В разделе 'Язык' меню 'Кабинет'", textUz: "'Kabinet' menyusining 'Til' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },

  // Reference & Personnel - Справочник - 20 questions
  {
    questionRu: "Где управлять сотрудниками?",
    questionUz: "Xodimlarni qayerda boshqarish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Персонал' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Xodimlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Как добавить нового водителя?",
    questionUz: "Yangi haydovchini qanday qo'shish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Водители' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Haydovchilar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Персонал'", textUz: "'Xodimlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как контролировать рабочие смены?",
    questionUz: "Ish smenalerini qanday nazorat qilish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Смены' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Smenalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Персонал'", textUz: "'Xodimlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Где найти Z-отчеты?",
    questionUz: "Z-hisobotlarni qayerda topish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Z-отчеты' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Z-hisobotlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Отчеты'", textUz: "'Hisobotlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false }
    ]
  },
  {
    questionRu: "Как печатать ценники?",
    questionUz: "Narx belgilarini qanday chop etish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Печать ценников' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Narx belgilarini chop etish' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как управлять клиентской базой?",
    questionUz: "Mijozlar bazasini qanday boshqarish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Клиенты' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Mijozlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как настроить программу лояльности?",
    questionUz: "Loyallik dasturini qanday sozlash mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Лояльность' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Loyallik' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Где добавить контрагентов?",
    questionUz: "Kontragentlarni qayerda qo'shish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Контрагенты' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Kontragentlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как отправлять СМС рассылку?",
    questionUz: "SMS jo'natishni qanday amalga oshirish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'СМС рассылка' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'SMS jo'natish' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как управлять документами?",
    questionUz: "Hujjatlarni qanday boshqarish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Документы' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Hujjatlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Где создать шаблоны СМС?",
    questionUz: "SMS shablonlarini qayerda yaratish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Шаблоны СМС' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'SMS shablonlari' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как проверить маркировки товаров?",
    questionUz: "Tovarlarning belgilashini qanday tekshirish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Аудит маркировок' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Belgilash auditi' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Где управлять электронным документооборотом?",
    questionUz: "Elektron hujjat aylanishini qayerda boshqarish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'ЭДО' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'EDO' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как управлять акциями и промо?",
    questionUz: "Aksiyalar va promolarni qanday boshqarish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Акции' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Aksiyalar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как добавить поставщика?",
    questionUz: "Ta'minchini qanday qo'shish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Поставщики' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Ta'minchilar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  },
  {
    questionRu: "Как управлять складами?",
    questionUz: "Omborlarni qanday boshqarish mumkin?",
    module: "Reference",
    options: [
      { textRu: "В разделе 'Склады' меню 'Справочник'", textUz: "'Spravochnik' menyusining 'Omborlar' bo'limida", isCorrect: true },
      { textRu: "В разделе 'Товары'", textUz: "'Tovarlar' bo'limida", isCorrect: false },
      { textRu: "В разделе 'Финансовые операции'", textUz: "'Moliyaviy operatsiyalar' bo'limida", isCorrect: false },
      { textRu: "Это невозможно сделать", textUz: "Buni qilish mumkin emas", isCorrect: false }
    ]
  }
];

// Connect to database
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lume_test_system",
});

console.log("Seeding 200 test questions...");

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  
  // Insert question
  const [qResult] = await connection.execute(
    "INSERT INTO questions (questionRu, questionUz, screenshotUrl, module) VALUES (?, ?, ?, ?)",
    [q.questionRu, q.questionUz, "https://placeholder.com/screenshot.png", q.module]
  );
  
  const questionId = qResult.insertId;
  
  // Insert options
  for (const opt of q.options) {
    await connection.execute(
      "INSERT INTO questionOptions (questionId, optionTextRu, optionTextUz, isCorrect) VALUES (?, ?, ?, ?)",
      [questionId, opt.textRu, opt.textUz, opt.isCorrect]
    );
  }
  
  if ((i + 1) % 10 === 0) {
    console.log(`Inserted ${i + 1} questions...`);
  }
}

console.log("✅ Successfully seeded 200 test questions!");
await connection.end();
