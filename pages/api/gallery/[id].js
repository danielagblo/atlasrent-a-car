const storage = require("../../../lib/api-storage");
const { verifyAdmin } = require("../../../lib/api-middleware/auth");

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    return verifyAdmin(req, res, async () => {
      const items = (await storage.getGallery()) || [];
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1)
        return res.status(404).json({ error: "Gallery item not found" });
      
      const next = { ...items[idx], ...req.body, id };
      items[idx] = next;
      await storage.saveGallery(items);
      return res.json(next);
    });
  }

  if (req.method === "DELETE") {
    return verifyAdmin(req, res, async () => {
      await storage.deleteGalleryItem(id);
      return res.json({ ok: true });
    });
  }

  res.setHeader("Allow", "PUT,DELETE");
  res.status(405).end("Method Not Allowed");
}
