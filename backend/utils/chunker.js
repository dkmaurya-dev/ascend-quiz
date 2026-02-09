export const splitDocument = (text, tokenChunkSize = 10000 * 4) => {
  if (!text) return [];
  const chunks = [];
  for (let i = 0; i < text.length; i += tokenChunkSize) {
    chunks.push(text.substring(i, i + tokenChunkSize));
  }
  if (chunks.length <= 2) return chunks;
  // Random.sample equivalent - pick two random chunks
  const res = [];
  const idxs = new Set();
  while (idxs.size < 2) {
    idxs.add(Math.floor(Math.random() * chunks.length));
  }
  for (const i of idxs) res.push(chunks[i]);
  return res;
};
