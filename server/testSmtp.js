const nodemailer = require('nodemailer');

async function testPassword(pass, label) {
  console.log(`Testing password [${label}]...`);
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'support@veritasaid.com',
      pass: pass
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000
  });

  try {
    await transporter.verify();
    console.log(`✅ SUCCESS! SMTP Verified with password: ${label}`);
    return true;
  } catch (err) {
    console.error(`❌ FAILED for [${label}]:`, err.message);
    return false;
  }
}

async function run() {
  await testPassword('ggRR54$$4E', 'ggRR54$$4E (two dollars)');
  await testPassword('ggRR54$4E', 'ggRR54$4E (one dollar)');
}

run();
