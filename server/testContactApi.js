const http = require('http');

const data = JSON.stringify({
  name: 'Test Client',
  email: 'support@veritasaid.com',
  subject: 'Inquiry about refund claim',
  message: 'Hello AVERADAO support team, this is a live test message sent from contact form.'
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/mail/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('RESPONSE:', body);
  });
});

req.on('error', (e) => {
  console.error('HTTP REQUEST ERROR:', e.message);
});

req.write(data);
req.end();
