import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendTeamInviteEmail(
  email: string,
  teamName: string,
  inviteUrl: string
) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Приглашение в команду ${teamName}`,
    html: `
      <h1>Приглашение в команду</h1>
      <p>Вы были приглашены присоединиться к команде ${teamName}.</p>
      <p>Для принятия приглашения перейдите по ссылке:</p>
      <a href="${inviteUrl}">Присоединиться к команде</a>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendPaymentConfirmationEmail(
  email: string,
  planName: string,
  amount: number,
  currency: string,
  receiptUrl: string
) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Подтверждение оплаты',
    html: `
      <h1>Подтверждение оплаты</h1>
      <p>Спасибо за подписку на план ${planName}!</p>
      <p>Сумма оплаты: ${amount} ${currency}</p>
      <p>Вы можете скачать чек по ссылке:</p>
      <a href="${receiptUrl}">Скачать чек</a>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendSubscriptionExpiringEmail(
  email: string,
  planName: string,
  daysLeft: number
) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Подписка скоро истекает',
    html: `
      <h1>Подписка скоро истекает</h1>
      <p>Ваша подписка на план ${planName} истекает через ${daysLeft} дней.</p>
      <p>Для продления подписки перейдите в раздел "Биллинг".</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendSubscriptionCanceledEmail(
  email: string,
  planName: string
) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Подписка отменена',
    html: `
      <h1>Подписка отменена</h1>
      <p>Ваша подписка на план ${planName} была отменена.</p>
      <p>Вы можете возобновить подписку в любое время в разделе "Биллинг".</p>
    `,
  };

  await transporter.sendMail(mailOptions);
} 