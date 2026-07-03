// Vercel Serverless Function: /api/send-application-email
// Expects POST JSON:
// {
//   applicantName, applicantEmail, position, subject, body,
//   fileName (optional), fileData (optional, base64 string or full data URL)
// }
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

  const { applicantName, applicantEmail, position, subject, body, fileName, fileData } = req.body || {};

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

  // Accept either a raw base64 string or a full data URL
  const attachments = [];
  if (fileData) {
    const base64 = fileData.includes(',') ? fileData.split(',')[1] : fileData;
    attachments.push({
      filename: fileName || 'application_document',
      content: Buffer.from(base64, 'base64')
    });
  }

  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@kadcoslubaga.co.ug',
    to: 'admin@kadcoslubaga.co.ug',
    cc: 'kadcoslubaga.sacco@gmail.com',
    replyTo: applicantEmail || undefined,
    subject: subject || `KADCOS Leadership Application - ${position || ''} - ${applicantName || ''}`,
    text: body || '',
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Application email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send application email', error: error.message });
  }
}
