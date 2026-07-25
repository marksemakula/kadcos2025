// Vercel Serverless Function: /api/send-contact-email
// Expects POST JSON: { name, email, phone, subject, message }
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   SMTP_HOST  e.g. the MXroute SMTP server for kadcoslubaga.co.ug
//   SMTP_PORT  e.g. 587
//   SMTP_USER  e.g. noreply@kadcoslubaga.co.ug
//   SMTP_PASS  the mailbox password
//   FROM_EMAIL (optional, defaults to noreply@kadcoslubaga.co.ug)

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP_USER / SMTP_PASS environment variables are not set');
    return res.status(500).json({ success: false, message: 'Email service not configured (missing SMTP credentials)' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: (process.env.SMTP_PORT || '587') === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const body = `NEW CONTACT FORM MESSAGE FROM KADCOS WEBSITE

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

Submitted: ${new Date().toLocaleString()}`;

  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@kadcoslubaga.co.ug',
    to: 'admin@kadcoslubaga.co.ug',
    cc: 'kadcoslubaga.sacco@gmail.com',
    replyTo: email,
    subject: subject ? `KADCOS Contact Form: ${subject}` : `KADCOS Contact Form message from ${name}`,
    text: body
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
}
