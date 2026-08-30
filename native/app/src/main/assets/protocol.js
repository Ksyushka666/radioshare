// RadioShare MVP: offline-first protocol primitives for Windows/Android PWA and future USB/Bluetooth radio bridges.
export const PROTOCOL_VERSION = 1;
export const MAX_FILE_BYTES = 70 * 1024 ** 3;
export const DEFAULT_CHUNK_BYTES = 4 * 1024 * 1024;

export function createPacket({ type, source, destination = "broadcast", payload, ttl = 8 }) {
  return { v: PROTOCOL_VERSION, id: crypto.randomUUID(), type, source, destination, ttl, createdAt: new Date().toISOString(), payload };
}

export async function sha256(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function makeFileManifest(file, chunkBytes = DEFAULT_CHUNK_BYTES) {
  if (file.size > MAX_FILE_BYTES) throw new Error("Файл больше поддерживаемого лимита 70 ГБ");
  return { transferId: crypto.randomUUID(), name: file.name, size: file.size, mime: file.type || "application/octet-stream", chunkBytes, chunks: Math.ceil(file.size / chunkBytes), sha256: null, received: [] };
}

export async function readChunk(file, index, chunkBytes = DEFAULT_CHUNK_BYTES) {
  const start = index * chunkBytes;
  const end = Math.min(start + chunkBytes, file.size);
  const data = await file.slice(start, end).arrayBuffer();
  return { index, start, end, bytes: data.byteLength, sha256: await sha256(data), data };
}

export function nextMissingChunk(manifest) {
  for (let index = 0; index < manifest.chunks; index += 1) if (!manifest.received.includes(index)) return index;
  return null;
}

export function markChunkReceived(manifest, index) {
  return { ...manifest, received: [...new Set([...manifest.received, index])].sort((a, b) => a - b) };
}
