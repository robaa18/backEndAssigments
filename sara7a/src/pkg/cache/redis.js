import Redis from "ioredis";
export class RedisCacheProvider {
  client;
  constructor(config) {
    this.client = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,
      lazyConnect: true,
      maxretriesPerRequest: 3,
    });
    this.client.on("error", (err) => {
      console.log("Redis connection error:", err);
    });
    this.client.connect().catch((err) => {
      console.log("Redis connection error:", err);
    });
  }
  async set(key, value, ttl) {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    return await this.client.set(key, value, "EX", ttl);
  }
  async get(key) {
    let value = await this.client.get(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
  async delete(key) {
    return this.client.del(key);
  }
}
