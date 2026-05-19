import { MMKVStorage } from '@/infrastructure/storage/MMKVStorage';

export const CACHE_KEY = 'query-cache';
export const storage = new MMKVStorage();
