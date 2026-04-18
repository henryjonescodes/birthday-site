import type { Context } from "https://edge.netlify.com";

export default async function handler(req: Request, _ctx: Context) {
  const url = new URL(req.url).searchParams.get("url");

  if (!url) {
    return new Response("Missing url param", { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  // Only allow http/https
  if (!["http:", "https:"].includes(target.protocol)) {
    return new Response("Forbidden protocol", { status: 403 });
  }

  const upstream = await fetch(target.toString(), {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; birthday-proxy/1.0)",
      "Accept": req.headers.get("Accept") ?? "*/*",
      "Accept-Language": req.headers.get("Accept-Language") ?? "en-US,en;q=0.9",
    },
    redirect: "follow",
  });

  const headers = new Headers(upstream.headers);

  // Strip headers that block iframe embedding
  headers.delete("x-frame-options");
  headers.delete("content-security-policy");
  headers.delete("content-security-policy-report-only");

  // Rewrite absolute URLs in HTML so relative links still work
  const contentType = headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    let body = await upstream.text();
    const base = `${target.protocol}//${target.host}`;
    // Inject a <base> tag so relative paths resolve against the origin
    body = body.replace(/(<head[^>]*>)/i, `$1<base href="${base}/">`);
    return new Response(body, { status: upstream.status, headers });
  }

  return new Response(upstream.body, { status: upstream.status, headers });
}

export const config = { path: "/proxy" };
