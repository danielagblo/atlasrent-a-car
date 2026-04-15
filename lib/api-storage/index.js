// Storage adapter selector. Exposes a common API for server data operations.
const adapterName = process.env.STORAGE_ADAPTER || 'json'

let adapter
if (adapterName === 'postgres' || adapterName === 'postgress') {
  console.log('--- STORAGE ADAPTER: POSTGRES ACTIVE ---')
  adapter = require('./postgresAdapter')
} else {
  console.log('--- STORAGE ADAPTER: JSON ACTIVE ---')
  adapter = require('./jsonAdapter')
}

// Ensure getTeam is available (for debugging visibility)
if (!adapter.getTeam) {
  console.error('CRITICAL: getTeam method missing from selected adapter:', adapterName)
}

module.exports = adapter
