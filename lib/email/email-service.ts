import nodemailer from 'nodemailer';
import passwordReset from './templates/password-reset';
import verificationEmail from './templates/verification-email';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const transporter = createTransporter();

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    });

    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendVerificationEmail(email: string, verificationToken: string, name: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email/${verificationToken}`;

  const html = verificationEmail({ name, verificationUrl })

  return sendEmail({
    to: "andrewgura94@gmail.com",
    subject: 'Verify your email address to login the AAP platform.',
    text: `Hi ${name}! Please verify your email address by clicking this link: ${verificationUrl}. This link expires in 24 hours. If you didn't create this account, please ignore this email.`,
    html
  });
}

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

  const html = passwordReset({ resetUrl })

  return sendEmail({
    to: "andrewgura94@gmail.com",
    subject: 'Password Reset Request for AAP',
    text: `Click this link to reset your password: ${resetUrl}. This link expires in 1 hour.`,
    html
  });
}