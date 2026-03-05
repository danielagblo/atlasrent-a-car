// Storage adapter selector. Exposes a common API for server data operations.
const adapterName = process.env.STORAGE_ADAPTER || 'json'
let adapter
if (adapterName === 'postgres') {
  adapter = require('./postgresAdapter')
} else {
  adapter = require('./jsonAdapter')
}

module.exports = adapter
