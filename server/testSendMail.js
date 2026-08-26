require('dotenv').config();
const { sendEmail } = require('./services/emailService');

async function testRealSend() {
  console.log('Sending real test email via Hostinger SMTP...');
  try {
    const res = await sendEmail({
      email: 'support@veritasaid.com',
      subject: 'Test Email Verification',
      message: 'This is a test email sent from Veritas backend to verify Hostinger SMTP delivery.',
      html: '<p>This is a <b>test email</b> sent from Veritas backend to verify Hostinger SMTP delivery.</p>'
    });
    console.log('SUCCESS! Email sent:', res.response);
  } catch (err) {
    console.error('FAILED to send email:', err);
  }
}

testRealSend();
