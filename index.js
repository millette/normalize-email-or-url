'use strict'

// FIXME: Add unit tests

const normalizeEmail = require('normalize-email')
const normalizeUrl = require('normalize-url')

const run = str => {
  str = str.trim()
  if (!str) {
    return { error: 'missing param' }
  }
  if (str.indexOf('.') === -1) {
    return { error: 'need at least one "."' }
  }

  const pAt = str.indexOf('@')
  const pSlash = str.indexOf('/')
  const bothAtSlash = pAt !== -1 && pSlash !== -1
  const slashPreAt = bothAtSlash && pSlash < pAt

  if (slashPreAt) {
    return { url: normalizeUrl(str, { stripWWW: false }) }
  }

  const [name, domain] = str.replace(/^mailto:/, '').split('@')
  if (domain) {
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
  return { url: normalizeUrl(name, { stripWWW: false }) }
}

/*
const { url, email, error } = run('bob')

console.log('url', url)
console.log('email', email)
console.log('error', error)
*/

module.exports = run
