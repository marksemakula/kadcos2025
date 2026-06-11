# Draft reply to Amos

Subject: RE: Suggestions on KADCOS Website

Dear Amos,

Thank you for the detailed review — every point has been investigated and most are already fixed in code, pending the next deployment. Here is the status on each:

**1A. Leadership candidates tab.** Found and fixed several issues. The dashboard was showing placeholder data because it could not reach the Google Sheet that stores applications — I am correcting the sheet's sharing settings so real submissions appear. Attachments were being lost due to a faulty email route; this is now rebuilt and CVs/documents (up to 4MB) will be emailed to admin@kadcoslubaga.co.ug with a copy to the SACCO Gmail. The Approve/Reject buttons now keep their status after a refresh.

**1B. "Failed to persist CMS changes".** This was caused by missing server configuration (the keys that let the dashboard publish content to the website). I am setting these up — once done, Resources, Services and the other tabs will save and appear on the live site after a short automatic redeploy (1–3 minutes).

**2A. Videos.** Two technical issues were serving an empty page instead of the video files. Both are fixed; the Welcome and Membership Benefits videos will play after the next deployment.

**2B. Application forms.** Individual, joint and group applications are saved to Google Sheets (via Google Apps Script) — no data has been lost. I will share access to those Sheets with you, and as a next step we plan to add a "Membership Applications" tab to the admin dashboard so you can receive them there directly.

**2C. Contribute to Blog.** The button now opens a pre-filled email to the admin address with a contribution template, so visitors can engage immediately.

**2D. Mail.** The Mail link now consistently opens the webmail portal (mail.mxlogin.com) where you log in with the kadcoslubaga.co.ug email accounts. I will send you the admin email login credentials privately by phone/WhatsApp rather than over email, for security.

**2E. Resources/e-Library downloads.** The Download buttons are now functional. The documents themselves (annual reports, guides, etc.) need to be uploaded through the admin dashboard (Content Management → Resources) — once the configuration in 1B is live, you will be able to upload and they will be downloadable by category.

**Zukuka Tukole loan.** Once the dashboard saving is live you can add/update it under Services yourself — or send me the product details and I will add it directly.

I expect to push these changes and complete the configuration by [DAY]. I will confirm once deployed so you can test, and I will call you regarding the email credentials.

Thank you for the thorough feedback.

Best regards,
Mark Semakula
