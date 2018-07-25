'use strict'

import test from 'ava'
import fn from '.'

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
