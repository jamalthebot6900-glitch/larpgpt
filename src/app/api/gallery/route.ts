import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET() {
  try {
    const sb = getServiceClient();
    const { data, error } = await sb
      .from("larps")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ larps: data || [] });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json({ larps: [] });
  }
}
