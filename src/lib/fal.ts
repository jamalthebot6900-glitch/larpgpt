const FAL_KEY = process.env.FAL_KEY;

interface FalResult {
  images: { url: string; content_type: string }[];
}

export async function generateSceneImage(prompt: string): Promise<string> {
  if (!FAL_KEY) throw new Error("FAL_KEY not configured");

  const res = await fetch("https://queue.fal.run/fal-ai/flux-pro/v1.1", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_size: "square_hd",
      num_images: 1,
      enable_safety_checker: false,
      output_format: "jpeg",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Flux Pro failed: ${res.status} ${err}`);
  }

  const data: FalResult = await res.json();
  return data.images[0].url;
}

export async function faceSwap(
  sceneImageUrl: string,
  selfieBase64: string
): Promise<string> {
  if (!FAL_KEY) throw new Error("FAL_KEY not configured");

  const res = await fetch("https://queue.fal.run/fal-ai/face-swap", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base_image_url: sceneImageUrl,
      swap_image_url: selfieBase64,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Face swap failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.image?.url || data.images?.[0]?.url;
}
