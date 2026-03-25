import { NextRequest, NextResponse } from "next/server";
import { buildPrompt, generateWithFace, generateTextOnly } from "@/lib/fal";
import { scenes } from "@/lib/scenes";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { sceneId, selfieBase64, customPrompt } = await req.json();

    if (!sceneId && !customPrompt) {
      return NextResponse.json(
        { error: "Missing sceneId or customPrompt" },
        { status: 400 }
      );
    }

    // Resolve the scene description — preset or custom
    let sceneDescription: string;
    let scene = null;

    if (sceneId) {
      scene = scenes.find((s) => s.id === sceneId);
      if (!scene) {
        return NextResponse.json(
          { error: "Invalid scene" },
          { status: 400 }
        );
      }
      sceneDescription = scene.prompt;
    } else {
      sceneDescription = customPrompt;
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json({
        imageUrl: null,
        demo: true,
        scene,
        message: "Demo mode — FAL_KEY not set. Image generation is disabled.",
      });
    }

    // Build the full photorealistic prompt
    const fullPrompt = buildPrompt(sceneDescription);

    let imageUrl: string;

    if (selfieBase64) {
      // Face reference provided → use edit endpoint for natural integration
      imageUrl = await generateWithFace(fullPrompt, selfieBase64);
    } else {
      // No face → text-only generation
      imageUrl = await generateTextOnly(fullPrompt);
    }

    return NextResponse.json({
      imageUrl,
      demo: false,
      scene,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
