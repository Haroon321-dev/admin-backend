export const resetPasswordTemplate = (userName, resetLink) => `
<div style="font-family: Arial, sans-serif; 
            max-width: 600px; margin: auto; padding: 20px; 
            background-color: #f9f9f9; border-radius: 8px; 
            border: 1px solid #ddd;">

    <h2 style="text-align: center; color: #333;">Reset Your Password</h2>

    <p style="color: #555; font-size: 16px;">Hi ${userName || 'there'},</p>
    <p style="color: #555; font-size: 16px;">
        You requested to reset your password. 
        Click the button below to set a new password. 
        This link is valid for <strong>15 minutes</strong>.
    </p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #007BFF; color: white; 
                                    text-decoration: none; padding: 12px 25px; 
                                    border-radius: 5px; font-size: 16px; 
                                    display: inline-block;">
            Reset Password
        </a>
    </div>
    <p style="color: #999; font-size: 14px; text-align: center;">
        If you didn't request a password reset, you can safely ignore this email.
    </p>
    <p style="color: #999; 
            font-size: 14px; text-align: 
            center;"> &copy; 2026 YourCompany. All rights reserved.</p>
</div>
`;
