import { Context, Next } from "https://deno.land/x/oak/mod.ts";

export async function loggingMiddleware(ctx: Context, next: Next) {
  const currentDate = new Date().toISOString();
  console.log(`[LOGGING] [${currentDate}] ${ctx.request.method} request to ${ctx.request.url}`);
  await next();
}
