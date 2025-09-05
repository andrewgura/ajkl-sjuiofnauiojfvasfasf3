export default ({ resetUrl }: { resetUrl: string }): string => (
  `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #DC2626; color: white !important; padding: 20px; border-radius: 8px 8px 0 0; }
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
  `
);