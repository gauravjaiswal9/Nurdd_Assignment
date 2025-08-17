// src/services/ai.js
// Optional AI refinement service (stubbed for now)

export async function refineDescription(original) {
  if (!original) return null;
  // For now just return the original description.
  // Later you can integrate OpenAI / HuggingFace here.
  return original;
}
