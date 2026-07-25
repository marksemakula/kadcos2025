// Vercel Serverless Function: /api/send-membership-email
// Emails passport photo attachments for a membership application, since the
// Google Apps Script sheet (see /api/submit-membership) can't hold base64
// image data in a text cell.
//
// Expects POST JSON:
// {
//   formType: 'individual' | 'joint' | 'group',
//   applicantName, branch,
//   attachments: [{ fileName, fileData }]  // fileData: base64 or data URL
// }
//
// Required env vars (same as /api/send-application-email and
// /api/send-contact-email): SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
// FROM_EMAIL (optional)

import nodemailer from 'nodemailer';

const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // stay well under Vercel's 4.5MB body limit

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

  const { formType, applicantName, branch, attachments } = req.body || {};

  if (!Array.isArray(attachments) || attachments.length === 0) {
    return res.status(400).json({ success: false, message: 'No attachments provided' });
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

  let totalBytes = 0;
  const mailAttachments = [];
  for (const att of attachments) {
    if (!att.fileData) continue;
    const base64 = att.fileData.includes(',') ? att.fileData.split(',')[1] : att.fileData;
    const buffer = Buffer.from(base64, 'base64');
    totalBytes += buffer.length;
    if (totalBytes > MAX_TOTAL_BYTES) {
      return res.status(413).json({ success: false, message: 'Attachments too large' });
    }
    mailAttachments.push({ filename: att.fileName || 'passport_photo.jpg', content: buffer });
  }

  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@kadcoslubaga.co.ug',
    to: 'admin@kadcoslubaga.co.ug',
    cc: 'kadcoslubaga.sacco@gmail.com',
    subject: `KADCOS Membership Application (${formType || 'unknown'}) - Passport Photos - ${applicantName || 'Unnamed applicant'}`,
    text: `Passport photo(s) attached for a ${formType || ''} membership application.\n\nApplicant/Group: ${applicantName || 'Not provided'}\nBranch: ${branch || 'Not provided'}\nSubmitted: ${new Date().toLocaleString()}\n\nThe rest of the application form was submitted separately to the membership Google Sheet.`,
    attachments: mailAttachments
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Passport photos emailed successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send passport photos', error: error.message });
  }
}
