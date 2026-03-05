const storage = require("../../../lib/api-storage");
const { normalizeModel } = require("../../../lib/api-utils/helpers");
const { verifyAdmin } = require("../../../lib/api-middleware/auth");

module.exports = async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const models = await storage.getModels();
    const model = models.find((m) => m.id === id);
    if (!model) return res.status(404).json({ error: "Model not found" });
    return res.json(model);
  }

  if (req.method === "PUT") {
    return verifyAdmin(req, res, async () => {
      const models = await storage.getModels();
      const idx = models.findIndex((m) => m.id === id);
      if (idx === -1) return res.status(404).json({ error: "Model not found" });
      const next = normalizeModel({ ...models[idx], ...req.body, id });
      models[idx] = next;
      await storage.saveModels(models);
      return res.json(next);
    });
  }

  if (req.method === "DELETE") {
    return verifyAdmin(req, res, async () => {
      const models = await storage.getModels();
      const filtered = models.filter((m) => m.id !== id);
      if (filtered.length === models.length)
        return res.status(404).json({ error: "Model not found" });
      await storage.saveModels(filtered);
      return res.json({ ok: true });
    });
  }

  res.setHeader("Allow", "GET,PUT,DELETE");
  res.status(405).end("Method Not Allowed");
};
