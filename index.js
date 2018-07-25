'use strict'

// woot

const normalizeEmail = require('normalize-email')
const normalizeUrl = require('normalize-url')

const run = str => {
  if (!str) {
    return { error: 'missing param' }
  }
  str = str.trim()
  const pos = str.indexOf('.')
  if (pos === -1) {
    return { error: 'need at least one "."' }
  }

  if (!pos || str.length < 3) {
    return { error: 'need something on both sides of the "."' }
  }

  const pAt = str.indexOf('@')
  const pSlash = str.indexOf('/')
  const bothAtSlash = pAt !== -1 && pSlash !== -1
  const slashPreAt = bothAtSlash && pSlash < pAt

  if (slashPreAt) {
    return { url: normalizeUrl(str, { stripWWW: false }) }
  }

  const [name, domain] = str.replace(/^mailto:/, '').split('@')

  if (!domain) {
    return { url: normalizeUrl(str, { stripWWW: false }) }
  }

  if (bothAtSlash && pAt < pSlash) {
    return { error: 'bad email (/)' }
  }

  const email = normalizeEmail(`${name}@${domain}`)
  const [nameNormalized] = email.split('@')
  const d = normalizeUrl(domain, { stripWWW: false }).slice(7)
  if (email === `${nameNormalized}@${d}`) {
    return { email }
  }

  return { error: 'bad email' }
}

module.exports = run
