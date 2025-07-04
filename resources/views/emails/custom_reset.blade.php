<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f8f8f8;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <p style="font-size: 16px;">Hello,</p>

        <p style="font-size: 15px;">
            We received a request to reset the password for your <strong>Emalli Roosa</strong> account.
            If you initiated this request, please click the button below to set a new password.
        </p>

        <p style="text-align: center; margin: 30px 0;">
            <a href="{{ $url }}" style="display: inline-block; padding: 14px 28px; background-color: #c27d72; color: #fff; text-decoration: none; font-size: 16px; border-radius: 6px; font-weight: bold;">
                Reset Your Password
            </a>
        </p>

        <p style="font-size: 14px; color: #555;">
            If you did not request a password reset, please ignore this email. Your account will remain secure.
        </p>

        <p style="font-size: 15px;">Best regards,<br><strong>Team Emalli Roosa</strong></p>
    </div>
</body>
</html>