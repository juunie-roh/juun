import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const blob = await put(filename, request.body, {
    access: "private",
    allowOverwrite: true,
  });

  return NextResponse.json(blob);
}
