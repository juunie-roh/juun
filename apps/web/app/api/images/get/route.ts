import { get } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // ⚠️ Authenticate the request before serving the blob

  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  const result = await get(pathname, { access: "private" });
  if (result?.statusCode !== 200) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
