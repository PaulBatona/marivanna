export default async function handler(req, res) {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, phone, message } = req.body

  // Проверка обязательных полей
  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone are required' })
  }

  // Токен бота и Chat ID из переменных окружения
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ message: 'Telegram configuration error' })
  }

  // Формируем сообщение
  const text = `
🔥 *Новая заявка на бронь*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
💬 *Сообщение:* ${message || '—'}

🕒 *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
  `.trim()

  // Отправляем в Telegram
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'Markdown'
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.description || 'Telegram API error')
    }

    return res.status(200).json({ message: 'Success' })
  } catch (error) {
    console.error('Telegram error:', error)
    return res.status(500).json({ message: 'Failed to send message' })
  }
}
