import { NextRequest, NextResponse } from "next/server";
import { generateSceneImage, faceSwap } from "@/lib/fal";
import { scenes } from "@/lib/scenes";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { sceneId, selfieBase64 } = await req.json();

    if (!sceneId) {
      return NextResponse.json({ error: "Missing sceneId" }, { status: 400 });
    }

    const scene = scenes.find((s) => s.id === sceneId);
    if (!scene) {
      return NextResponse.json({ error: "Invalid scene" }, { status: 400 });
    }

    if (!process.env.FAL_KEY) {
      // Demo mode: return placeholder
      return NextResponse.json({
        imageUrl: null,
        demo: true,
        scene: scene,
        message: "Demo mode — FAL_KEY not set. Image generation is disabled.",
      });
    }

    // Step 1: Generate scene
    const sceneImageUrl = await generateSceneImage(scene.prompt);

    // Step 2: Face swap (if selfie provided)
    let finalImageUrl = sceneImageUrl;
    if (selfieBase64) {
      finalImageUrl = await faceSwap(sceneImageUrl, selfieBase64);
    }

    return NextResponse.json({
      imageUrl: finalImageUrl,
      demo: false,
      scene: scene,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
