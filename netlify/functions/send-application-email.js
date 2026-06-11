const nodemailer = require('nodemailer');

// Netlify Function: send-application-email
// Replaces the old (non-functional) Next.js-style route at src/pages/api/.
// Expects POST JSON:
// {
//   applicantName, applicantEmail, position, subject, body,
//   fileName (optional), fileData (optional, base64 string WITHOUT data: prefix or full data URL)
// }
//
// Required environment variables (set in Netlify → Site settings → Environment variables):
//   SMTP_HOST  e.g. the MXroute SMTP server for kadcoslubaga.co.ug
//   SMTP_PORT  e.g. 587
//   SMTP_USER  e.g. noreply@kadcoslubaga.co.ug
//   SMTP_PASS  the mailbox password
//   FROM_EMAIL (optional, defaults to noreply@kadcoslubaga.co.ug)

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ success: false, message: 'Method not allowed' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Invalid JSON' }) };
  }

  const { applicantName, applicantEmail, position, subject, body, fileName, fileData } = payload;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP_USER / SMTP_PASS environment variables are not set');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Email service not configured (missing SMTP credentials)' })
    };
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
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Application email sent successfully' })
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Failed to send application email', error: error.message })
    };
  }
};
