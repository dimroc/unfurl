import fs from 'fs'
import http from 'http'
import iconv from 'iconv-lite'

import nock from 'nock'

const unfurl = require('../../src/')
import UnexpectedError from '../../src/unexpectedError'

test('should throw bad options error', async () => {
  try {
    // @ts-ignore
    await unfurl('http://localhost', '')
  } catch (err) {
    expect(err.name).toEqual(UnexpectedError.BAD_OPTIONS.name)
    expect(err.message).toEqual(UnexpectedError.BAD_OPTIONS.message)
  }
})

test('should respect oembed', async () => {
  nock('http://localhost')
    .get('/html/oembed')
    .replyWithFile(200, __dirname + '/../oembed/oembed.html', {
      'Content-Type': 'text/html'
    })

  const result = await unfurl('http://localhost/html/oembed', { oembed: false })

  expect(result.oEmbed).toEqual(undefined)
})
