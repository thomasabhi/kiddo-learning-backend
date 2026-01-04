import { Request, Response, NextFunction } from "express";
import {cache} from "../app";

// Middleware to cache GET requests with optional TTL
export const cacheMiddleware = (ttlSeconds: number = 60) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") return next();

    // Unique key based on URL + query string
    const key = `cache:${req.originalUrl}`;

    const cachedData = cache.get(key);
    if (cachedData) {
      console.log(`⚡ Cache hit: ${key}`);
      return res.status(200).json(cachedData);
    }

    // Override res.json to store in cache automatically
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      cache.set(key, body, ttlSeconds);
      console.log(`💾 Cache set: ${key}`);
      return originalJson(body);
    };

    next();
  };
};
