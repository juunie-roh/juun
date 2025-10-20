import { testConnection } from "@juun/db/utils/test-connection";

export async function GET() {
  const result = await testConnection();
  return Response.json(result);
}
