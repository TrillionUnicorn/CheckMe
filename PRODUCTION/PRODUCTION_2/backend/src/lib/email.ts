/**
 * Email Service
 * Supports: SendGrid, Resend, SMTP
 */

import { Resend } from 'resend';

const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'resend'; // 'resend', 'sendgrid', 'smtp'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@checkme.com';
const FROM_NAME = process.env.FROM_NAME || 'CheckMe';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email templates
 */
const templates = {
  welcome: (name: string) => ({
    subject: 'Welcome to CheckMe!',
    html: `
      <h1>Welcome to CheckMe, ${name}!</h1>
      <p>Thank you for signing up. We're excited to have you on board.</p>
      <p>Get started by verifying your first identity:</p>
      <a href="${process.env.FRONTEND_URL}/verify" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        Start Verifying
      </a>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>The CheckMe Team</p>
    `,
  }),

  verificationComplete: (type: string, result: any) => ({
    subject: `Verification Complete: ${type}`,
    html: `
      <h1>Verification Complete</h1>
      <p>Your ${type} verification has been completed.</p>
      <div style="background: #F3F4F6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p><strong>Status:</strong> ${result.valid ? '✓ Valid' : '✗ Invalid'}</p>
        <p><strong>Risk Score:</strong> ${result.riskScore}/100</p>
      </div>
      <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        View Dashboard
      </a>
    `,
  }),

  passwordReset: (resetToken: string) => ({
    subject: 'Reset Your Password',
    html: `
      <h1>Reset Your Password</h1>
      <p>You requested to reset your password. Click the button below to create a new password:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        Reset Password
      </a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  }),

  subscriptionConfirmed: (plan: string) => ({
    subject: `Subscription Confirmed: ${plan} Plan`,
    html: `
      <h1>Subscription Confirmed!</h1>
      <p>Thank you for subscribing to the ${plan} plan.</p>
      <p>Your subscription is now active and you have access to all premium features.</p>
      <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        Go to Dashboard
      </a>
    `,
  }),

  usageAlert: (used: number, limit: number) => ({
    subject: 'Usage Alert: Approaching Limit',
    html: `
      <h1>Usage Alert</h1>
      <p>You've used ${used} of your ${limit} monthly verifications (${Math.round((used / limit) * 100)}%).</p>
      <p>Consider upgrading your plan to avoid service interruption.</p>
      <a href="${process.env.FRONTEND_URL}/pricing" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        Upgrade Plan
      </a>
    `,
  }),
};

/**
 * Send email using Resend
 */
async function sendWithResend(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Send email using SendGrid
 */
async function sendWithSendGrid(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // SendGrid implementation
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // ...
  return { success: false, error: 'SendGrid not configured' };
}

/**
 * Send email using SMTP
 */
async function sendWithSMTP(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // SMTP implementation using nodemailer
  // const nodemailer = require('nodemailer');
  // ...
  return { success: false, error: 'SMTP not configured' };
}

/**
 * Main send email function
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return { success: false, error: 'Invalid email address' };
  }

  // Choose provider
  switch (EMAIL_PROVIDER) {
    case 'resend':
      return await sendWithResend(to, subject, html);
    case 'sendgrid':
      return await sendWithSendGrid(to, subject, html);
    case 'smtp':
      return await sendWithSMTP(to, subject, html);
    default:
      console.log(`Email would be sent to ${to}: ${subject}`);
      return { success: true, messageId: 'demo-mode' };
  }
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(to: string, name: string) {
  const { subject, html } = templates.welcome(name);
  return await sendEmail(to, subject, html);
}

/**
 * Send verification complete email
 */
export async function sendVerificationCompleteEmail(
  to: string,
  type: string,
  result: any
) {
  const { subject, html } = templates.verificationComplete(type, result);
  return await sendEmail(to, subject, html);
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const { subject, html } = templates.passwordReset(resetToken);
  return await sendEmail(to, subject, html);
}

/**
 * Send subscription confirmed email
 */
export async function sendSubscriptionConfirmedEmail(to: string, plan: string) {
  const { subject, html } = templates.subscriptionConfirmed(plan);
  return await sendEmail(to, subject, html);
}

/**
 * Send usage alert email
 */
export async function sendUsageAlertEmail(to: string, used: number, limit: number) {
  const { subject, html } = templates.usageAlert(used, limit);
  return await sendEmail(to, subject, html);
}

export default {
  sendEmail,
  sendWelcomeEmail,
  sendVerificationCompleteEmail,
  sendPasswordResetEmail,
  sendSubscriptionConfirmedEmail,
  sendUsageAlertEmail,
};

