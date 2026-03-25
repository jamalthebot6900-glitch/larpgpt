const FAL_KEY = process.env.FAL_KEY;

const REALISM_PREFIX =
  "Using this exact person's face with perfect identity preservation. " +
  "Match their gender, ethnicity, skin tone, facial structure, and appearance precisely. " +
  "The face must look exactly like the reference — same bone structure, same features, same person. " +
  "Create an ultra-photorealistic photograph that looks like it was taken from someone's Instagram or Twitter feed: ";

const REALISM_SUFFIX =
  " Technical requirements: Shot on a Canon EOS R5 with an 85mm f/1.4 lens at ISO 200, " +
  "natural ambient lighting, realistic color grading like an iPhone or DSLR photo posted on social media. " +
  "Include: natural skin pores and texture, subsurface skin scattering, micro-imperfections (moles, freckles, stubble), " +
  "real volumetric shadows, natural hair strands, fabric wrinkles and texture detail, " +
  "realistic depth of field with slight bokeh, natural lens compression, " +
  "authentic body proportions matching the person's build. " +
  "The lighting must match the environment — no studio lighting in outdoor scenes. " +
  "This must be completely indistinguishable from a real candid photo. " +
  "Absolutely no: airbrushing, plastic/waxy skin, uncanny valley, cartoonish features, " +
  "over-saturated colors, AI glow, symmetrical perfection, or any tell-tale signs of AI generation.";

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
