const test = require('ava')

const S1 = require('./index')
const db = new S1('qBVic7I7gSf_DbHPm0eTIkknhXlWyMhgKMF4wzwSesqSPeXxneCB6DCGM2FBCMHxJkBF4abyQuI5bsnSNM7Biw==')

test('can set and get raw values', async (t) => {
  await db.setRaw('get-set-key', 'value')
  t.is(await db.getRaw('get-set-key'), 'value')
})

test('deleting a value sets it to null', async (t) => {
  await db.setRaw('delete-key', 'value')
  await db.delete('delete-key')
  t.is(await db.getRaw('delete-key'), null)
})

test('json objects serialize properly', async (t) => {
  const object = { foo: 'bar', uwu: 123 }
  await db.set('json-key', object)
  t.deepEqual(await db.get('json-key'), object)
})

test('invalid json throws an error', async (t) => {
  await db.setRaw('invalid-json-key', '/')
  await t.throwsAsync(async () => await db.get('invalid-json-key'))
})