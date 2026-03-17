const path = require('path')
const fs = require('fs-extra')

const DATA_DIR = path.join(process.cwd(), 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')
const MODELS_FILE = path.join(DATA_DIR, 'models.json')
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json')
const NEWS_FILE = path.join(DATA_DIR, 'news.json')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')

fs.ensureDirSync(DATA_DIR)

function readJson(file, defaultVal = []) {
  try { return fs.readJsonSync(file) } catch (e) { return defaultVal }
}

function writeJson(file, data) { fs.writeJsonSync(file, data, { spaces: 2 }) }

module.exports = {
  getOrders: () => readJson(ORDERS_FILE),
  saveOrders: (orders) => writeJson(ORDERS_FILE, orders),
  deleteOrder: (id) => {
    const items = readJson(ORDERS_FILE).filter(o => o.id !== id)
    writeJson(ORDERS_FILE, items)
  },
  getModels: () => readJson(MODELS_FILE),
  saveModels: (models) => writeJson(MODELS_FILE, models),
  deleteModel: (id) => {
    const items = readJson(MODELS_FILE).filter(m => m.id !== id)
    writeJson(MODELS_FILE, items)
  },
  getTestimonials: () => readJson(TESTIMONIALS_FILE),
  saveTestimonials: (items) => writeJson(TESTIMONIALS_FILE, items),
  deleteTestimonial: (id) => {
    const items = readJson(TESTIMONIALS_FILE).filter(t => t.id !== id)
    writeJson(TESTIMONIALS_FILE, items)
  },
  getNews: () => readJson(NEWS_FILE),
  saveNews: (items) => writeJson(NEWS_FILE, items),
  deleteNews: (id) => {
    const items = readJson(NEWS_FILE).filter(n => n.id !== id)
    writeJson(NEWS_FILE, items)
  },
  getSettings: () => readJson(SETTINGS_FILE, {}),
  saveSettings: (settings) => writeJson(SETTINGS_FILE, settings)
}
