// Email service using Nodemailer
import nodemailer from 'nodemailer';
import { config } from '../config.js';

let transporter = null;

function getTransporter() {
  if (!config.email.enabled) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  return transporter;
}

export async function sendContactEmail({ name, email, message }) {
  const tx = getTransporter();
  if (!tx) {
    // Development: log to console
    console.log('--- Contact Form Submission (dev mode) ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('------------------------------------------');
    return { success: true, dev: true };
  }

  const info = await tx.sendMail({
    from: config.email.from,
    to: config.email.to,
    subject: `Portfolio Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  });

  return { success: true, messageId: info.messageId };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

export async function verifyEmailConfig() {
  const tx = getTransporter();
  if (!tx) return { ok: false, reason: 'Email not configured' };
  try {
    await tx.verify();
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}