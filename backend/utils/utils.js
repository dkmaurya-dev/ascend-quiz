import crypto from "crypto";
// Generate unique assessment code
export function generateUniqueString() {
  return crypto.randomBytes(16).toString("hex");
}