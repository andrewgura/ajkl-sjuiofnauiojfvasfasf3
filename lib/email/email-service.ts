import nodemailer from 'nodemailer';

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

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; }
          .footer { background: #e5e7eb; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
          .verification-box { background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 4px; margin: 20px 0; text-align: center; }
          .button { 
            display: inline-block; 
            background: #4F46E5; 
            color: white !important; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: bold;
            margin: 20px 0;
            font-size: 16px;
          }
          .button:hover { background: #4338ca; }
          .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .highlight { color: #4F46E5; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to Our Platform!</h1>
            <p style="margin: 0; font-size: 18px; opacity: 0.9;">Just one more step to get started</p>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for creating your account! We're excited to have you on board.</p>
            
            <div class="verification-box">
              <h3 style="margin-top: 0; color: #0ea5e9;">📧 Verify Your Email Address</h3>
              <p>To complete your registration and start using your account, please verify your email address by clicking the button below:</p>
              
              <a href="${verificationUrl}" class="button">Verify My Email</a>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
                This verification link will expire in <span class="highlight">24 hours</span>.
              </p>
            </div>
            
            <div class="warning">
              <p><strong>⚠️ Important:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>You cannot log in until your email is verified</li>
                <li>This link is single-use and expires in 24 hours</li>
                <li>If you didn't create this account, please ignore this email</li>
              </ul>
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f1f5f9; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 14px;">
              ${verificationUrl}
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            
            <p>Need help? Contact our support team - we're here to help!</p>
            <p>Welcome aboard! 🚀</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>If you're having trouble with the verification link, you can request a new one from the login page.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: "andrewgura94@gmail.com",
    subject: 'Verify your email address to login the AAP platform.',
    text: `Hi ${name}! Please verify your email address by clicking this link: ${verificationUrl}. This link expires in 24 hours. If you didn't create this account, please ignore this email.`,
    html
  });
}

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #DC2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .button { display: inline-block; background: #DC2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>You requested a password reset for your account.</p>
            
            <a href="${resetUrl}" class="button">Reset Password</a>
            
            <div class="warning">
              <p><strong>Security Notice:</strong></p>
              <ul>
                <li>This link expires in 1 hour</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <p>If the button doesn't work, copy and paste this link:</p>
            <p><code>${resetUrl}</code></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Password Reset Request for AAP',
    text: `Click this link to reset your password: ${resetUrl}. This link expires in 1 hour.`,
    html
  });
}