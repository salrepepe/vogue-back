const prisma = require("../../prisma/client");


async function upsertCategory({
  name,
  slug,
  parentId = null,
  fullPath,
  sortOrder = 0,
}) {
  return prisma.category.upsert({
    where: {
      fullPath,
    },
    update: {},
    create: {
      name,
      slug,
      parentId,
      fullPath,
      sortOrder,
    },
  });
}


async function seedCategories() {
  console.log("🌱 Categories seed start");


  // ======================
  // WOMEN
  // ======================

  const women = await upsertCategory({
    name: "Женщинам",
    slug: "women",
    fullPath: "/women",
    sortOrder: 1,
  });


  const womenClothes = await upsertCategory({
    name: "Одежда",
    slug: "clothing",
    parentId: women.id,
    fullPath: "/women/clothing",
    sortOrder: 1,
  });


  const womenClothing = [
    "Платья",
    "Костюмы",
    "Пиджаки",
    "Блузы",
    "Футболки",
    "Топы",
    "Свитеры",
    "Кардиганы",
    "Джинсы",
    "Брюки",
    "Юбки",
    "Шорты",
  ];


  for (let i = 0; i < womenClothing.length; i++) {
    const name = womenClothing[i];

    await upsertCategory({
      name,
      slug: translit(name),
      parentId: womenClothes.id,
      fullPath: `/women/clothing/${translit(name)}`,
      sortOrder: i,
    });
  }


  const womenOuter = await upsertCategory({
    name: "Верхняя одежда",
    slug: "outerwear",
    parentId: women.id,
    fullPath: "/women/outerwear",
  });


  const womenShoes = await upsertCategory({
    name: "Обувь",
    slug: "shoes",
    parentId: women.id,
    fullPath: "/women/shoes",
  });


  const womenShoesList = [
    "Туфли",
    "Ботинки",
    "Сапоги",
    "Лоферы",
    "Кеды",
  ];


  for (let i = 0; i < womenShoesList.length; i++) {
    const name = womenShoesList[i];

    await upsertCategory({
      name,
      slug: translit(name),
      parentId: womenShoes.id,
      fullPath: `/women/shoes/${translit(name)}`,
      sortOrder: i,
    });
  }


  const womenAccessories = await upsertCategory({
    name: "Аксессуары",
    slug: "accessories",
    parentId: women.id,
    fullPath: "/women/accessories",
  });


  const womenAccessoriesList = [
    "Очки",
    "Ремни",
    "Платки",
    "Сумки",
  ];


  for (let i = 0; i < womenAccessoriesList.length; i++) {
    const name = womenAccessoriesList[i];

    await upsertCategory({
      name,
      slug: translit(name),
      parentId: womenAccessories.id,
      fullPath: `/women/accessories/${translit(name)}`,
      sortOrder: i,
    });
  }



  // ======================
  // MEN
  // ======================


  const men = await upsertCategory({
    name: "Мужчинам",
    slug: "men",
    fullPath: "/men",
    sortOrder: 2,
  });


  const menClothes = await upsertCategory({
    name: "Одежда",
    slug: "clothing",
    parentId: men.id,
    fullPath: "/men/clothing",
  });


  const menClothing = [
    "Футболки",
    "Поло",
    "Рубашки",
    "Свитеры",
    "Худи",
    "Пиджаки",
    "Костюмы",
    "Брюки",
    "Джинсы",
  ];


  for (let i = 0; i < menClothing.length; i++) {
    const name = menClothing[i];

    await upsertCategory({
      name,
      slug: translit(name),
      parentId: menClothes.id,
      fullPath: `/men/clothing/${translit(name)}`,
      sortOrder: i,
    });
  }


  await upsertCategory({
    name: "Верхняя одежда",
    slug: "outerwear",
    parentId: men.id,
    fullPath: "/men/outerwear",
  });


  const menShoes = await upsertCategory({
    name: "Обувь",
    slug: "shoes",
    parentId: men.id,
    fullPath: "/men/shoes",
  });


  const menShoesList = [
    "Туфли",
    "Ботинки",
    "Лоферы",
    "Кеды",
  ];


  for (let i = 0; i < menShoesList.length; i++) {

    const name = menShoesList[i];

    await upsertCategory({
      name,
      slug: translit(name),
      parentId: menShoes.id,
      fullPath: `/men/shoes/${translit(name)}`,
      sortOrder: i,
    });
  }


  const menAccessories = await upsertCategory({
    name: "Аксессуары",
    slug: "accessories",
    parentId: men.id,
    fullPath: "/men/accessories",
  });


  for (const name of [
    "Сумки",
    "Ремни",
    "Очки",
  ]) {

    await upsertCategory({
      name,
      slug: translit(name),
      parentId: menAccessories.id,
      fullPath: `/men/accessories/${translit(name)}`,
    });
  }



  // ======================
  // OTHER
  // ======================


  await upsertCategory({
    name: "Посуда",
    slug: "tableware",
    fullPath: "/tableware",
  });


  await upsertCategory({
    name: "Парфюм",
    slug: "perfume",
    fullPath: "/perfume",
  });



  console.log("✅ Categories seeded");
}



function translit(text) {

  const map = {
    "а":"a","б":"b","в":"v","г":"g","д":"d",
    "е":"e","ё":"e","ж":"zh","з":"z",
    "и":"i","й":"y","к":"k","л":"l",
    "м":"m","н":"n","о":"o","п":"p",
    "р":"r","с":"s","т":"t","у":"u",
    "ф":"f","х":"h","ц":"c","ч":"ch",
    "ш":"sh","щ":"sch","ы":"y",
    "э":"e","ю":"yu","я":"ya"
  };


  return text
    .toLowerCase()
    .split("")
    .map(char => map[char] || char)
    .join("")
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/(^-|-$)/g,"");
}


module.exports = {
  seedCategories,
};