import 's1db'

declare module s1db {
  class S1 {
    constructor(token: string, baseUrl?: string)

    async get(key: string): any
    async getRaw(key: string): string

    async set(key: string, value: any)
    async setRaw(key: string, value: string)

    async delete(key: string)
    async getKeys(): string[]
  }
}

export = s1db.S1
