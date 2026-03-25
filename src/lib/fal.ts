const FAL_KEY = process.env.FAL_KEY;

const REALISM_PREFIX =
  "Using this exact person's face with perfect identity preservation. Match their gender, ethnicity and appearance precisely. Create an ultra-photorealistic photograph: ";

const REALISM_SUFFIX =
  " Shot on a Canon EOS R5 with an 85mm f/1.4 lens at ISO 200. " +
  "The image must look indistinguishable from a real photograph — " +
  "include natural skin texture, real shadows, slight lens compression, " +
  "authentic body proportions. No airbrushing, no plastic skin, no uncanny valley.";

/**
 * Build a full photorealistic prompt from a scene description.
 * Works for both preset scenes and custom user text.
 */
export function buildPrompt(sceneDescription: string): string {
  return REALISM_PREFIX + sceneDescription.trim() + REALISM_SUFFIX;
}

interface NanoBananaResult {
  images: { url: string; content_type: string }[];
}

/**
 * Generate a scene image with the user's face embedded using
 * Nano Banana's native image-to-image edit endpoint.
 *
 * This passes the face reference directly into the model so the
 * identity is naturally integrated — no separate face swap needed.
 */
export async function generateWithFace(
  prompt: string,
  faceImageDataUri: string,
  aspectRatio: string = "16:9"
): Promise<string> {
  if (!FAL_KEY) throw new Error("FAL_KEY not configured");

  // Submit to queue
  const submitRes = await fetch(
    "https://queue.fal.run/fal-ai/nano-banana/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_urls: [faceImageDataUri],
        aspect_ratio: aspectRatio,
        output_format: "jpeg",
        safety_tolerance: "6",
        num_images: 1,
        limit_generations: true,
      }),
    }
  );

  if (!submitRes.ok) {
    const err = await submitRes.text();
    throw new Error(`Nano Banana submit failed: ${submitRes.status} ${err}`);
  }

  const queue = await submitRes.json();

  if (queue.images) {
    // Sync response — already have the result
    return queue.images[0].url;
  }

  // Poll for result (queue-based)
  const responseUrl = queue.response_url;
  if (!responseUrl) throw new Error("No response_url from queue");

  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 2000));

    const pollRes = await fetch(responseUrl, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });

    if (pollRes.status === 200) {
      const data: NanoBananaResult = await pollRes.json();
      if (data.images?.[0]?.url) {
        return data.images[0].url;
      }
    }
    // 202 = still processing, keep polling
  }

  throw new Error("Generation timed out after 120 seconds");
}

/**
 * Text-only generation (no face reference).
 * Used for previews or when no selfie is provided.
 */
export async function generateTextOnly(
  prompt: string,
  aspectRatio: string = "16:9"
): Promise<string> {
  if (!FAL_KEY) throw new Error("FAL_KEY not configured");

  const submitRes = await fetch("https://queue.fal.run/fal-ai/nano-banana", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      aspect_ratio: aspectRatio,
      output_format: "jpeg",
      safety_tolerance: "6",
      num_images: 1,
      limit_generations: true,
    }),
  });

  if (!submitRes.ok) {
    const err = await submitRes.text();
    throw new Error(`Nano Banana failed: ${submitRes.status} ${err}`);
  }

  const queue = await submitRes.json();

  if (queue.images) return queue.images[0].url;

  const responseUrl = queue.response_url;
  if (!responseUrl) throw new Error("No response_url from queue");

  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 2000));

    const pollRes = await fetch(responseUrl, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });

    if (pollRes.status === 200) {
      const data: NanoBananaResult = await pollRes.json();
      if (data.images?.[0]?.url) return data.images[0].url;
    }
  }

  throw new Error("Generation timed out after 120 seconds");
}
