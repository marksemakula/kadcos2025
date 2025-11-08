// pages/api/send-application-email.js
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we're using formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse the form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const {
      applicantName,
      applicantEmail,
      position,
      subject,
      body
    } = fields;

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@kadcoslubaga.co.ug',
      to: 'admin@kadcoslubaga.co.ug', // Primary recipient
      cc: 'kadcoslubaga.sacco@gmail.com', // Secondary recipient
      subject: subject || 'KADCOS Leadership Application',
      text: body,
      attachments: files.attachment ? [
        {
          filename: files.attachment[0].originalFilename || 'application_document',
          content: fs.createReadStream(files.attachment[0].filepath),
        }
      ] : [],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Clean up temporary files
    if (files.attachment) {
      fs.unlinkSync(files.attachment[0].filepath);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully with attachment' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send application email',
      error: error.message 
    });
  }
}