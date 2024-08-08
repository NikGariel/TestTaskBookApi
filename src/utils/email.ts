import nodemailer from 'nodemailer';

let transporterOptions;

switch (process.env.EMAIL_TYPE) {
  case 'smtp':
    transporterOptions = {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    break;
  case 'gmail':
    transporterOptions = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    break;
}

const transporter = nodemailer.createTransport(transporterOptions);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p><br><p>If you cant click, just open this URL - ${verificationUrl}</p>`,
  };
  if (process.env.NODE_ENV === 'development') {
    console.log(JSON.stringify({ verificationUrl: verificationUrl, email: email, html: mailOptions.html }));
  }
  await transporter.sendMail(mailOptions);
}
