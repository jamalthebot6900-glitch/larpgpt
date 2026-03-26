const FAL_KEY = process.env.FAL_KEY;

const REALISM_PREFIX =
  "Ultra-photorealistic candid photograph of this exact person. Preserve their precise facial structure, bone structure, skin tone, ethnicity, and every identifying feature with perfect accuracy. This must look identical to them — same face, same person, no alterations. ";

const REALISM_SUFFIX =
  " Shot on a Canon EOS R5 with an 85mm f/1.4 lens at ISO 200. Natural ambient lighting that matches the environment — golden hour warmth outdoors, cool fluorescents indoors, neon reflections at night. " +
  "Include: visible skin pores, natural skin texture with subsurface scattering, micro-imperfections like moles and freckles and stubble, real volumetric shadows with soft falloff, individual hair strands catching light, " +
  "fabric wrinkles and weave texture, realistic shallow depth of field with creamy bokeh on the background, natural lens compression, authentic body proportions. " +
  "The color grading should look like a high-end iPhone or DSLR photo posted on Instagram — slightly warm, natural saturation, no filters. " +
  "This must be completely indistinguishable from a real photograph. Absolutely zero: airbrushing, plastic or waxy skin, uncanny valley, cartoonish features, over-saturated colors, AI glow, symmetrical perfection, " +
  "text overlays, watermarks, UI elements, borders, or any artifacts that reveal AI generation. Just the raw photo, nothing else.";

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

  // Submit to queue — using Nano Banana Pro 2 (Gemini 3 Pro Image)
  const submitRes = await fetch(
    "https://queue.fal.run/fal-ai/nano-banana-pro/edit",
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
        resolution: "2K",
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
 * Uses FLUX Pro 1.1 for superior photorealism in previews/showcase.
 */
export async function generateTextOnly(
  prompt: string,
  aspectRatio: string = "16:9"
): Promise<string> {
  if (!FAL_KEY) throw new Error("FAL_KEY not configured");

  // Map aspect ratio to pixel dimensions for FLUX Pro
  const dimensions: Record<string, { width: number; height: number }> = {
    "16:9": { width: 1920, height: 1080 },
    "9:16": { width: 1080, height: 1920 },
    "1:1": { width: 1024, height: 1024 },
    "4:3": { width: 1440, height: 1080 },
    "3:4": { width: 1080, height: 1440 },
  };
  const size = dimensions[aspectRatio] || dimensions["16:9"];

  const submitRes = await fetch("https://queue.fal.run/fal-ai/flux-pro/v1.1", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      width: size.width,
      height: size.height,
      num_images: 1,
      safety_tolerance: 6,
    }),
  });

  if (!submitRes.ok) {
    const err = await submitRes.text();
    throw new Error(`FLUX Pro 1.1 failed: ${submitRes.status} ${err}`);
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
