"use client";

import { useRef, useCallback } from "react";

interface RateLimitOptions {
  maxRequests?: number;
  windowMs?: number;
  retryAfterMs?: number;
}

export function useRateLimit(options: RateLimitOptions = {}) {
  const {
    maxRequests = 5,
    windowMs = 10000, // 10 segundos
    retryAfterMs = 5000 // 5 segundos
  } = options;

  const requestCount = useRef(0);
  const windowStart = useRef(Date.now());
  const lastRequestTime = useRef(0);

  const canMakeRequest = useCallback(() => {
    const now = Date.now();
    
    // Reset counter if window has passed
    if (now - windowStart.current > windowMs) {
      requestCount.current = 0;
      windowStart.current = now;
    }

    // Check if we've exceeded the rate limit
    if (requestCount.current >= maxRequests) {
      return false;
    }

    // Check if we need to wait between requests
    if (now - lastRequestTime.current < retryAfterMs) {
      return false;
    }

    return true;
  }, [maxRequests, windowMs, retryAfterMs]);

  const recordRequest = useCallback(() => {
    requestCount.current++;
    lastRequestTime.current = Date.now();
  }, []);

  const reset = useCallback(() => {
    requestCount.current = 0;
    windowStart.current = Date.now();
    lastRequestTime.current = 0;
  }, []);

  return {
    canMakeRequest,
    recordRequest,
    reset
  };
}
