'use strict'

import test from 'ava'
import fn from '.'

test('zero-0', t => {
  const { url, email, error } = fn()
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('zero-1', t => {
  const { url, email, error } = fn(' ')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('zero-2', t => {
  const { url, email, error } = fn('.')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

// FIXME: should not error, êxample should be "punycoded"
test.skip('zero-3', t => {
  const { url, email, error } = fn('joe@www.êxample.com')
  t.falsy(error)
  t.falsy(url)
  t.is(email, 'joe@xn--xample-hva.com')
})

test('zero-10', t => {
  const { url, email, error } = fn('joe@xn--xample-hva.com')
  t.falsy(error)
  t.falsy(url)
  t.is(email, 'joe@xn--xample-hva.com')
})

test('zero-10b', t => {
  const { url, email, error } = fn('http://xn--xample-hva.com')
  t.falsy(error)
  t.is(url, 'http://xn--xample-hva.com')
  t.falsy(email)
})

test('zero', t => {
  const { url, email, error } = fn('joe@bob.ca/john')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('one', t => {
  const { url, email, error } = fn('bob')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('two', t => {
  const { url, email, error } = fn('bob.ca')
  t.falsy(error)
  t.is(url, 'http://bob.ca')
  t.falsy(email)
})

test('three', t => {
  const { url, email, error } = fn('bob.ca/joe')
  t.falsy(error)
  t.is(url, 'http://bob.ca/joe')
  t.falsy(email)
})

test('three-b', t => {
  const { url, email, error } = fn('Bob.ca/joe')
  t.falsy(error)
  t.is(url, 'http://bob.ca/joe')
  t.falsy(email)
})

test('three-c', t => {
  const { url, email, error } = fn('Bob.ca/Joe')
  t.falsy(error)
  t.is(url, 'http://bob.ca/Joe')
  t.falsy(email)
})

test('four', t => {
  const { url, email, error } = fn('bob.ca/joe@john')
  t.falsy(error)
  t.is(url, 'http://bob.ca/joe@john')
  t.falsy(email)
})

test('five', t => {
  const { url, email, error } = fn('joe@bob.ca')
  t.falsy(error)
  t.falsy(url)
  t.is(email, 'joe@bob.ca')
})

test('six', t => {
  const { url, email, error } = fn('www.êxample.com')
  t.falsy(error)
  t.is(url, 'http://www.xn--xample-hva.com')
  t.falsy(email)
})
