import type { IncomingMessage, ServerResponse } from 'node:http'

export interface VercelRequest extends IncomingMessage {
  query?: Record<string, string | string[]>
  cookies?: Record<string, string>
  body?: unknown
}

export interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse
  json: (body: unknown) => VercelResponse
  send: (body: unknown) => VercelResponse
}

interface ContactPayload {
  fullName?: unknown
  businessName?: unknown
  email?: unknown
  phone?: unknown
  projectType?: unknown
  budget?: unknown
  description?: unknown
  // Honeypot fields for bot traps
  hp_website?: unknown
  honeypot?: unknown
  website?: unknown
  _gotcha?: unknown
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_REGEX = /^[0-9+\-\s()]{7,30}$/

const LIMITS = {
  fullName: 100,
  businessName: 150,
  email: 254,
  phone: 30,
  projectType: 100,
  budget: 100,
  description: 3000,
} as const

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

async function parseBody(req: VercelRequest): Promise<ContactPayload | null> {
  // If already parsed by Vercel's body parser
  if (req.body && typeof req.body === 'object') {
    return req.body as ContactPayload
  }

  // If passed as JSON string
  if (typeof req.body === 'string' && req.body.trim().length > 0) {
    try {
      return JSON.parse(req.body) as ContactPayload
    } catch {
      return null
    }
  }

  // Fallback: read incoming stream if unparsed
  if (req.body === undefined && typeof req.on === 'function') {
    try {
      const chunks: Buffer[] = []
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
      }
      const raw = Buffer.concat(chunks).toString('utf8').trim()
      if (!raw) return {}
      return JSON.parse(raw) as ContactPayload
    } catch {
      return null
    }
  }

  return {}
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST requests are accepted.',
    })
  }

  // 2. Parse request body
  const body = await parseBody(req)
  if (!body) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload received.',
    })
  }

  // 3. Spam protection: Honeypot check
  const honeypotTriggered = Boolean(
    (typeof body.hp_website === 'string' && body.hp_website.trim().length > 0) ||
      (typeof body.honeypot === 'string' && body.honeypot.trim().length > 0) ||
      (typeof body.website === 'string' && body.website.trim().length > 0) ||
      (typeof body._gotcha === 'string' && body._gotcha.trim().length > 0),
  )

  if (honeypotTriggered) {
    // Return a fake 200 OK so bots believe submission succeeded and stop retrying
    return res.status(200).json({
      success: true,
      message: 'Thank you. Your project enquiry has been received.',
    })
  }

  // 4. Validate and sanitize inputs
  const fullName = sanitizeString(body.fullName, LIMITS.fullName)
  const businessName = sanitizeString(body.businessName, LIMITS.businessName)
  const email = sanitizeString(body.email, LIMITS.email)
  const phone = sanitizeString(body.phone, LIMITS.phone)
  const projectType = sanitizeString(body.projectType, LIMITS.projectType)
  const budget = sanitizeString(body.budget, LIMITS.budget)
  const description = sanitizeString(body.description, LIMITS.description)

  if (!fullName) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your full name.',
    })
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your email address.',
    })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address (e.g. name@domain.com).',
    })
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid phone or WhatsApp number format.',
    })
  }

  // 5. Verify Resend API Key is configured on the server
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('CRITICAL: RESEND_API_KEY environment variable is not defined. Please add RESEND_API_KEY to your Vercel Environment Variables or local .env.local file.')
    return res.status(500).json({
      success: false,
      message: 'Email service is temporarily unavailable. Please reach out to hello@sindeeinfotech.com directly.',
    })
  }

  // 6. Escape all content before interpolating into HTML email
  const safeFullName = escapeHtml(fullName)
  const safeBusinessName = escapeHtml(businessName)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safeProjectType = escapeHtml(projectType)
  const safeBudget = escapeHtml(budget)
  const safeDescriptionHtml = description
    ? escapeHtml(description).replace(/\r\n|\n|\r/g, '<br />')
    : '<span style="color: #94a3b8; font-style: italic;">No description provided.</span>'

  const submissionDate = new Date().toUTCString()

  // 7. Render professional HTML email
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0d1322; padding: 32px 28px; text-align: left; border-bottom: 3px solid #bdf024;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #bdf024; text-transform: uppercase; font-family: monospace;">Sindee Infotech &bull; Contact Form</span>
                    <h1 style="margin: 8px 0 0 0; color: #ffffff; font-size: 22px; font-weight: 800; line-height: 1.3;">New Project Enquiry</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 28px;">
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #64748b;">
                You received a new website project enquiry through the contact form on <strong style="color: #0f172a;">sindeeinfotech.com</strong>.
              </p>

              <!-- Enquiry Details Table -->
              <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 24px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; width: 34%; border-bottom: 1px solid #e2e8f0;">Full Name</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${safeFullName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">Email Address</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">Business / Company</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${safeBusinessName || '<span style="color: #94a3b8; font-style: italic;">Not specified</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">Phone / WhatsApp</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${safePhone ? `<a href="tel:${safePhone}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${safePhone}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not specified</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">Type of Project</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${safeProjectType || '<span style="color: #94a3b8; font-style: italic;">Not specified</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Estimated Budget</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a;">
                    ${safeBudget || '<span style="color: #94a3b8; font-style: italic;">Not specified</span>'}
                  </td>
                </tr>
              </table>

              <!-- Project Description Block -->
              <div style="margin-bottom: 24px;">
                <h3 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin: 0 0 8px 0;">Project Description</h3>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; color: #1e293b;">
                  ${safeDescriptionHtml}
                </div>
              </div>

              <!-- Quick Action Call-to-Action -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Website Project Enquiry — ${fullName}`)}" style="display: inline-block; background-color: #0d1322; color: #ffffff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.02em;">Reply to ${safeFullName}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Note -->
          <tr>
            <td style="background-color: #f8fafc; padding: 16px 28px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                Submitted securely via Sindee Infotech Contact Form &bull; ${submissionDate}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  // Plain text version for fallback & anti-spam scoring
  const text = `New Website Project Enquiry — Sindee Infotech
==================================================

Full Name:          ${fullName}
Email Address:      ${email}
Business / Company: ${businessName || 'Not specified'}
Phone / WhatsApp:   ${phone || 'Not specified'}
Type of Project:    ${projectType || 'Not specified'}
Estimated Budget:   ${budget || 'Not specified'}

Project Description:
--------------------------------------------------
${description || 'No description provided.'}

--------------------------------------------------
Submitted at: ${submissionDate}
Domain: https://sindeeinfotech.com`

  // 8. Deliver email via Resend API
  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sindee Infotech <hello@sindeeinfotech.com>',
        to: ['sindeeinfotech@gmail.com'],
        reply_to: email,
        subject: `New website enquiry from ${fullName}`,
        html,
        text,
      }),
    })

    if (!resendResponse.ok) {
      const errorPayload = await resendResponse.text().catch(() => '')
      console.error('Resend API delivery error:', resendResponse.status, errorPayload)
      return res.status(502).json({
        success: false,
        message: 'Unable to deliver your enquiry at this time. Please reach out to hello@sindeeinfotech.com directly.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you. Your project enquiry has been received.',
    })
  } catch (err: unknown) {
    console.error('Network or unexpected error while delivering email:', err)
    return res.status(502).json({
      success: false,
      message: 'A network error occurred while sending your message. Please reach out to hello@sindeeinfotech.com directly.',
    })
  }
}
