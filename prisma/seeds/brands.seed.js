const prisma = require("../../prisma/client");

const brands = [
  {
    name: "Kiton",
    slug: "kiton",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Kiton_logo.svg/512px-Kiton_logo.svg.png",
  },
  {
    name: "Loro Piana",
    slug: "loro-piana",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Loro_Piana_logo.svg/512px-Loro_Piana_logo.svg.png",
  },
  {
    name: "Brunello Cucinelli",
    slug: "brunello-cucinelli",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Brunello_Cucinelli_logo.svg/512px-Brunello_Cucinelli_logo.svg.png",
  },
  {
    name: "Stefano Ricci",
    slug: "stefano-ricci",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Stefano_Ricci_logo.svg/512px-Stefano_Ricci_logo.svg.png",
  },
  {
    name: "Dolce & Gabbana",
    slug: "dolce-gabbana",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Dolce_%26_Gabbana.svg/512px-Dolce_%26_Gabbana.svg.png",
  },
  {
    name: "Gucci",
    slug: "gucci",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Gucci_logo.svg/512px-Gucci_logo.svg.png",
  },
  {
    name: "Dior",
    slug: "dior",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dior_Logo.svg/512px-Dior_Logo.svg.png",
  },
  {
    name: "Yves Saint Laurent",
    slug: "ysl",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Yves_Saint_Laurent_Logo.svg/512px-Yves_Saint_Laurent_Logo.svg.png",
  },
  {
    name: "Chanel",
    slug: "chanel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Chanel_logo_interlocking_cs.svg/512px-Chanel_logo_interlocking_cs.svg.png",
  },
  {
    name: "Hermes",
    slug: "hermes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Herm%C3%A8s.svg/512px-Herm%C3%A8s.svg.png",
  },
];

async function seedBrands() {
  console.log("🌱 Brands seed start");

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: {
        slug: brand.slug,
      },
      update: {},
      create: {
        name: brand.name,
        slug: brand.slug,
        logo: brand.logo,
      },
    });
  }

  console.log("✅ Brands seeded:", brands.length);
}

module.exports = {
  seedBrands,
  brands,
};
