export const generateEmailContent = (adminName, adminEmail, adminPassword) => {
    const subject = encodeURIComponent(
      "Welcome to Jagjit Kaur Admin Panel - Your Account Credentials"
    );

    const body = encodeURIComponent(`Dear ${adminName},

Welcome to the Jagjit Kaur Heritage Fashion admin team! 

Your admin account has been created successfully. Below are your login credentials:

🔐 LOGIN CREDENTIALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: ${adminEmail}
Password: ${adminPassword}
Admin Panel URL: ${window.location.origin}/admin/login
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 IMPORTANT SECURITY INSTRUCTIONS:
1. Please log in and IMMEDIATELY change your password
2. Use a unique password that you don't use anywhere else
3. Keep your credentials secure and do not share them
4. Contact me if you experience any login issues

📋 WHAT YOU CAN DO:
• Upload and manage product listings
• Add product images and descriptions
• Manage product categories and pricing
• Access the complete admin dashboard

🌟 ABOUT JAGJIT KAUR:
You're now part of a team dedicated to preserving and sharing the beauty of traditional Indian fashion. Our handcrafted pieces represent generations of artistry and cultural heritage.

If you have any questions or need assistance, please don't hesitate to reach out.

Welcome aboard!

Best regards,
Super Admin
Jkbyjagjitkaur.com
---
This email contains sensitive login information. Please delete this email after setting up your new password.`);

    return { subject, body };
  };