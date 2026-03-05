const storage = require("../../../../lib/api-storage");
const { buildInvoiceBuffer } = require("../../../../lib/api-utils/helpers");
const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST")
    return (
      res.setHeader("Allow", "POST") &&
      res.status(405).end("Method Not Allowed")
    );
  const { id } = req.query;
  const orders = await storage.getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail =
    process.env.FROM_EMAIL || smtpUser || "no-reply@example.com";

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    return res
      .status(501)
      .json({
        error:
          "SMTP not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars.",
      });
  }

  try {
    const pdfBuffer = await buildInvoiceBuffer(order);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
    const info = await transporter.sendMail({
      from: fromEmail,
      to: order.email,
      subject: `EKG Logistics and transport — Invoice ${order.id}`,
      text: `Dear ${order.name},\n\nPlease find attached the invoice for your order ${order.id}. Payment will be collected on delivery.\n\nThank you,\nEKG Logistics and transport`,
      attachments: [
        { filename: `invoice-${order.id}.pdf`, content: pdfBuffer },
      ],
    });
    return res.json({ ok: true, info });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to send email" });
  }
};
