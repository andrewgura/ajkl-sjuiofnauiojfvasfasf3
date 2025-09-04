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
            from: `"Your App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log('Email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function sendVerificationEmail(email: string, password: string, name: string) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .footer { background: #e5e7eb; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
          .password-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Our Platform!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Your account has been successfully created! We're excited to have you on board.</p>
            
            <div class="password-box">
              <h3>Your Temporary Login Details:</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Temporary Password:</strong> <code>${password}</code></p>
            </div>
            
            <p><strong>Important:</strong> Please log in and change your password immediately for security.</p>
            
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" class="button">Login Now</a>
            
            <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    return sendEmail({
        to: email,
        subject: 'Welcome! Your Account Has Been Created',
        text: `Welcome ${name}! Your account has been created. Your temporary password is: ${password}. Please log in and change your password.`,
        html
    });
}

export async function sendPasswordResetEmail(email: string, resetToken: string) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

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
        subject: 'Password Reset Request',
        text: `Click this link to reset your password: ${resetUrl}. This link expires in 1 hour.`,
        html
    });
}