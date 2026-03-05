const storage = require('../../lib/api-storage')
const nodemailer = require('nodemailer')

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).end('Method Not Allowed')
    }

    const { name, email, subject, message } = req.body || {}

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields (name, email, message)' })
    }

    try {
        const settings = await storage.getSettings()

        // SMTP Configuration from environment variables
        const smtpHost = process.env.SMTP_HOST
        const smtpPort = process.env.SMTP_PORT
        const smtpUser = process.env.SMTP_USER
        const smtpPass = process.env.SMTP_PASS

        // Recipient (Owner) and Sender info
        const adminEmail = settings?.adminEmail || process.env.ADMIN_EMAIL || process.env.FROM_EMAIL
        const fromEmail = settings?.fromEmail || process.env.FROM_EMAIL || smtpUser || 'no-reply@ekgtransport.com'

        if (!adminEmail) {
            console.error('Contact Email Error: No admin recipient email configured.')
            return res.status(500).json({ error: 'System configuration error: No recipient email.' })
        }

        if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
            console.error('Contact Email Error: SMTP not configured.')
            return res.status(500).json({ error: 'System configuration error: SMTP not configured.' })
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: Number(smtpPort),
            secure: Number(smtpPort) === 465,
            auth: { user: smtpUser, pass: smtpPass }
        })

        // Format the email content
        const mailOptions = {
            from: `"EKG Contact Form" <${fromEmail}>`,
            to: adminEmail,
            replyTo: email, // This allows the owner to hit 'Reply' directly to the customer
            subject: `Contact Form: ${subject || 'New Inquiry'} from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}
            `,
            html: `
                <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
                    <h2 style="color: #E30613;">New Contact Form Message</h2>
                    <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
                    <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                    <hr style="border: 0; border-top: 1px solid #eee;" />
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #E30613;">
                        ${message.replace(/\n/g, '<br/>')}
                    </div>
                </div>
            `
        }

        await transporter.sendMail(mailOptions)

        return res.status(200).json({ ok: true, message: 'Message sent successfully!' })

    } catch (error) {
        console.error('SMTP Send Error:', error)
        return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
    }
}
