const fetch = require('node-fetch')

/**
 * Base S1 client connector class.
 */
class S1 {
  /**
   * Create an S1 client.
   * 
   * @param {string} token - Your bearer token obtained from /token
   * @param {string} [baseUrl] - The S1 server's base url
   */
  constructor(token, baseUrl = 'https://s1.kognise.dev') {
    this.token = token
    this.baseUrl = baseUrl
  }

  /**
   * Set a key to a raw string.
   * 
   * @param {string} key - The key to set the value of
   * @param {string} value - The string to store
   */
  async setRaw(key, value) {
    const res = await fetch(`${this.baseUrl}/db/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: value,
      headers: { 'Authorization': `Bearer ${this.token}` }
    })
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
  }

  /**
   * Get a raw string without doing any parsing.
   * 
   * @param {string} key - The key to get a value at
   * @return {string|null} The stored string, or null if the key isn't set
   */
  async getRaw(key) {
    const res = await fetch(`${this.baseUrl}/db/${encodeURIComponent(key)}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    })
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    return await res.text()
  }

  /**
   * Deletes the key if it exists.
   * 
   * @param {string} key - The key to remove
   */
  async delete(key) {
    const res = await fetch(`${this.baseUrl}/db/${encodeURIComponent(key)}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${this.token}` }
    })
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
  }

  /**
   * Set a key to a javascript value, which will be serialized to json.
   * @see S1#setRaw for non-json values
   * 
   * @param {string} key - The key to set the value of
   * @param {*} value - Any serializable value to store
   */
  async set(key, value) {
    await this.setRaw(key, JSON.stringify(value))
  }

  /**
   * Get the value of a key and parse it as json.
   * @see S1#getRaw for non-json values
   * 
   * @param {string} key - The key to get a value at
   * @return {string|null} The parsed stored value, or null if the key isn't set
   */
  async get(key) {
    const value = await this.getRaw(key)
    if (value === null) return value
    try {
      return JSON.parse(value)
    } catch (error) {
      throw new Error(`Error parsing JSON for key ${key}, did you mean to use getRaw?`)
    }
  }
}

module.exports = S1