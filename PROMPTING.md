# LarpGPT Prompting Reference

## Model: Nano Banana Pro 2 (Gemini 3 Pro Image) via fal.ai
- Endpoint: `fal-ai/nano-banana-pro` (text-to-image) / `fal-ai/nano-banana-pro/edit` (face integration)
- Resolution: 2K
- Cost: ~$0.15/image

## ALWAYS use this structure for every generation:

### PREFIX (identity preservation — auto-prepended by code):
```
Ultra-photorealistic candid photograph of this exact person. Preserve their precise facial structure, bone structure, skin tone, ethnicity, and every identifying feature with perfect accuracy. This must look identical to them — same face, same person, no alterations.
```

### SCENE (the custom part):
```
[Describe the specific scene with rich environmental detail, specific brands/objects, clothing textures, lighting conditions, body language, and atmospheric elements. Be SPECIFIC — name the car model, the watch brand, the type of leather, the time of day, the weather.]
```

### SUFFIX (realism requirements — auto-appended by code):
```
Shot on a Canon EOS R5 with an 85mm f/1.4 lens at ISO 200. Natural ambient lighting that matches the environment — golden hour warmth outdoors, cool fluorescents indoors, neon reflections at night. Include: visible skin pores, natural skin texture with subsurface scattering, micro-imperfections like moles and freckles and stubble, real volumetric shadows with soft falloff, individual hair strands catching light, fabric wrinkles and weave texture, realistic shallow depth of field with creamy bokeh on the background, natural lens compression, authentic body proportions. The color grading should look like a high-end iPhone or DSLR photo posted on Instagram — slightly warm, natural saturation, no filters. This must be completely indistinguishable from a real photograph. Absolutely zero: airbrushing, plastic or waxy skin, uncanny valley, cartoonish features, over-saturated colors, AI glow, symmetrical perfection, text overlays, watermarks, UI elements, borders, or any artifacts that reveal AI generation. Just the raw photo, nothing else.
```

## Key Prompting Principles

1. **Describe like a photographer** — camera angle, focal length, lighting direction
2. **Name specific brands** — "Patek Philippe Nautilus 5711" not "luxury watch"
3. **Include environmental details** — weather, time of day, background elements
4. **Describe body language** — "leaning casually" not "standing"
5. **Add imperfections** — tousled hair, rolled sleeves, crumpled cans — real life isn't perfect
6. **Specify clothing textures** — "cashmere sweater" not "nice sweater"
7. **Light must match scene** — golden hour outdoors, screen glow in dark rooms, neon at night

## NEVER skip the suffix. NEVER abbreviate. Copy-paste every time.
