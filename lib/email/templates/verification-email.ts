
export default ({ name, verificationUrl }: { name: string, verificationUrl: string }): string => (
    `
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
          .highlight { color: #4F46E5; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verify your email addres</h1>
            <p style="margin: 0; font-size: 18px; opacity: 0.9;">Once verified, you will be able to use AAP.</p>
          </div>
          <div class="content">
            <p>Hello <strong>${name}</strong>,</p>
            
            <div class="verification-box">
              <h3 style="margin-top: 0; color: #0ea5e9;">📧 Verify Your Email Address</h3>
              <p>To complete your registration and start using your account, simply click the button below to verify your email address.</p>
              
              <a href="${verificationUrl}" class="button">Verify My Email</a>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
                This verification link will expire in <span class="highlight">24 hours</span>.
              </p>
            </div>
            
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f1f5f9; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 14px;">
              ${verificationUrl}
            </p>
            
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>If you're having trouble with the verification link, you can request a new one from the login page.</p>
          </div>
        </div>
      </body>
    </html>
  `
)