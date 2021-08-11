> 🚧 **This project is maintenance mode!** 🚧
> 
> I will be fixing and responding to pull requests and issues, but it is not in active development.

# S1 Node

A barebones key-value store that requires no setup besides a token. This is heavily inspired by `jsonstore.io`, but it's faster and much more reliable.

## Get a token

Head over to [s1.kognise.dev/token](https://s1.kognise.dev/token) to get yourself a token. Don't share this with anyone because it gives access to all of your database. I recommend putting it in an environment variable like `S1_TOKEN`.

## Installation

First, install S1 with either NPM or Yarn:
```
$ npm i s1db
$ yarn add s1db
```

Then, import it in your code like this:
```js
const S1 = require('s1db')
const db = new S1(process.env.S1_TOKEN)
```

## Usage

It's very easy to get, set, and delete values!
```js
await db.set('foo', 123)
await db.get('foo') // -> 123
await db.delete('foo')
```

If a key isn't set or has been deleted, `get` will return `null`.

For ease of use, this library will serialize and parse json so you can easily store objects, numbers, and other rich JavaScript values. You can access the raw string values with `setRaw` and `getRaw`:

```js
await db.setRaw('foo', '/')
await db.getRaw('foo') // -> '/'

await db.get('foo') // Error: invalid JSON!
```

You can also get a list of all keys that have been stored in your database:
```js
await db.getKeys()
```
