/**
 * Gallery image proxy: serves S3 objects with Content-Disposition: inline so
 * they render in <img> tags instead of downloading.
 */
import { Buffer } from "buffer";
import type { FastifyInstance } from "fastify";
import { clientId, clientSecret } from "../../../config.js";

type GalleryQuery = {
  key?: string | string[];
};

/**
 * Returns the backend API base URL derived from GRAPHQL_ENDPOINT.
 */
function getBackendApiBase(): string {
  const endpoint =
    process.env.GRAPHQL_ENDPOINT || "http://localhost:8083/graphql";
  try {
    const url = new URL(endpoint);
    url.pathname = "/";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return endpoint.replace(/\/graphql$/, "").replace(/\/$/, "");
  }
}

/**
 * Registers the /gallery proxy route for inline image display.
 */
export function registerGalleryProxyRoute(app: FastifyInstance): void {
  app.get<{ Querystring: GalleryQuery }>("/gallery", async (request, reply) => {
    const key = request.query.key;
    if (!key || Array.isArray(key)) {
      return reply.status(400).send({ error: "Missing key" });
    }

    const backendBase = getBackendApiBase();
    const upstreamUrl = `${backendBase}/api/buckets/gallery/download?key=${encodeURIComponent(String(key))}`;

    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        "X-Client-Id": clientId,
        "X-Client-Secret": clientSecret,
      },
    });
    reply.status(upstreamResponse.status);

    upstreamResponse.headers.forEach((value, name) => {
      const lower = name.toLowerCase();
      if (lower === "transfer-encoding" || lower === "content-disposition")
        return;
      reply.header(name, value);
    });

    // Force inline so browsers render the image, not download it.
    reply.header("Content-Disposition", "inline");

    const body = await upstreamResponse.arrayBuffer();
    return reply.send(Buffer.from(body));
  });
}
