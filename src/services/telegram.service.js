const axios = require("axios");

async function sendOrderToTelegram(order) {
  const itemsText = order.items
    .map((item) => {
      return `
🛍 ${item.product?.name || "Без названия"}

Размер:
${item.size?.name || item.variant?.size || "-"}

Цвет:
${item.color?.name || item.variant?.color || "-"}

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
async function sendStatusToTelegram(order) {
  const statusNames = {
    NEW: "🆕 Новый",

    PROCESSING: "⚙️ В обработке",

    SHIPPED: "🚚 Отправлен",

    COMPLETED: "✅ Завершен",

    CANCELLED: "❌ Отменен",
  };

  const text = `

📦 ОБНОВЛЕНИЕ ЗАКАЗА

Номер:
#${order.id.slice(-6)}

👤 Клиент:
${order.name}


Статус:

${statusNames[order.status]}


💰 Сумма:
${order.total}$

`;

  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text,
  });
}

module.exports = {
  sendOrderToTelegram,
  sendStatusToTelegram,
};
