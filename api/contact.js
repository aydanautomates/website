const nodemailer = require('nodemailer');

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting by IP
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(function (t) { return now - t < RATE_WINDOW; });

  if (recent.length >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Cleanup old entries
  if (rateLimitMap.size > 1000) {
    rateLimitMap.clear();
  }

  var { name, email, business, message, _honeypot } = req.body;

  // Honeypot check
  if (_honeypot) {
    return res.status(200).json({ success: true });
  }

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Send email
  try {
    var transporter = nodemailer.createTransport({
      host: 'smtp.forwardemail.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    var businessLine = business ? '\nBusiness: ' + business : '';

    await transporter.sendMail({
      from: 'operator@aydanautomates.com',
      to: 'operator@aydanautomates.com',
      replyTo: email,
      subject: 'New message from ' + name,
      text: 'Name: ' + name + '\nEmail: ' + email + businessLine + '\n\n' + message,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};
