const storage = require("../../../lib/api-storage");
const { verifyAdmin } = require("../../../lib/api-middleware/auth");
const { sendApprovalSms, sendApprovalEmail } = require("../../../lib/api-utils/notifications");

module.exports = async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const orders = await storage.getOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json(order);
  }

  if (req.method === "PUT") {
    return verifyAdmin(req, res, async () => {
      const orders = await storage.getOrders();
      const idx = orders.findIndex((o) => o.id === id);
      if (idx === -1) return res.status(404).json({ error: "Order not found" });
      const current = orders[idx];
      const next = Object.assign({}, current, req.body, {
        id: current.id,
        createdAt: current.createdAt,
      });
      orders[idx] = next;
      await storage.saveOrders(orders);

      // Trigger approval notifications if status changed to Approved
      if (next.status === "Approved" && current.status !== "Approved") {
        (async () => {
          try {
            await Promise.allSettled([
              sendApprovalSms(next),
              sendApprovalEmail(next)
            ]);
          } catch (e) {
            console.error("Approval notification error", e);
          }
        })();
      }

      return res.json(next);
    });
  }

  if (req.method === "DELETE") {
    return verifyAdmin(req, res, async () => {
      const orders = await storage.getOrders();
      const filtered = orders.filter((o) => o.id !== id);
      if (filtered.length === orders.length)
        return res.status(404).json({ error: "Order not found" });
      await storage.saveOrders(filtered);
      return res.json({ ok: true });
    });
  }

  res.setHeader("Allow", "GET,PUT,DELETE");
  res.status(405).end("Method Not Allowed");
};
