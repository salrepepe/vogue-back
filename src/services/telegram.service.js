const axios = require("axios");

async function sendOrderToTelegram(order) {
  const itemsText = order.items
    .map((item) => {
      return `
🛍 ${item.product?.name || "Без названия"}

Размер:
${item.variant?.size || "-"}

Цвет:
${item.variant?.color || "-"}

Количество:
${item.quantity}

Цена:
${item.price}$
`;
    })
    .join("\n");

  const message = `
🆕 НОВЫЙ ЗАКАЗ

👤 Клиент:
${order.name}

📞 Телефон:
${order.phone}

📍 Адрес:
${order.address || "Не указан"}


ТОВАРЫ:
${itemsText}


💰 ИТОГО:
${order.total}$
`;

  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    },
  );
}

module.exports = {
  sendOrderToTelegram,
};
