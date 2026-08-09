const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const translations = {
  "Мужское": "Men",
  "Женщинам": "Women",

  "Одежда": "Clothing",
  "Обувь": "Shoes",
  "Аксессуары": "Accessories",

  "Туфли": "Dress Shoes",
  "Лоферы": "Loafers",
  "Ботинки": "Boots",
  "Кеды": "Sneakers",

  "Сумки": "Bags",
  "Ремни": "Belts",
  "Очки": "Glasses",

  "Футболки": "T-Shirts",
  "Поло": "Polo Shirts",
  "Рубашки": "Shirts",
  "Свитеры": "Sweaters",
  "Худи": "Hoodies",
  "Пиджаки": "Blazers",
  "Костюмы": "Suits",
  "Брюки": "Trousers",
  "Джинсы": "Jeans",
  "Верхняя одежда": "Outerwear",

  "Платья": "Dresses",
  "Блузы": "Blouses",
  "Топы": "Tops",
  "Кардиганы": "Cardigans",
  "Юбки": "Skirts",
  "Шорты": "Shorts",
  "Сапоги": "Boots",
  "Платки": "Scarves",

  "Посуда": "Dishes",
  "Вазы": "Vases",
  "Полотенце": "Towels",
  "Для дома": "Home",
  "Парфюм": "Perfume",
};

async function main() {
  const categories = await prisma.category.findMany();

  for (const category of categories) {
    const englishName = translations[category.name];

    if (!englishName) {
      console.log(`⚠️ Перевод не найден: ${category.name}`);
      continue;
    }

    await prisma.categoryTranslation.upsert({
      where: {
        categoryId_language: {
          categoryId: category.id,
          language: "ru",
        },
      },
      update: {
        name: category.name,
      },
      create: {
        categoryId: category.id,
        language: "ru",
        name: category.name,
      },
    });

    await prisma.categoryTranslation.upsert({
      where: {
        categoryId_language: {
          categoryId: category.id,
          language: "en",
        },
      },
      update: {
        name: englishName,
      },
      create: {
        categoryId: category.id,
        language: "en",
        name: englishName,
      },
    });

    console.log(`✅ ${category.name} → ${englishName}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });