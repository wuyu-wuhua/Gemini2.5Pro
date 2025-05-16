import app from '../../server.js'; // Adjust path if your server.js is elsewhere relative to this file
import serverless from 'serverless-http';

const handler = serverless(app);

// Cloudflare Pages Function handler
export async function onRequest(context) {
  // context.request: The Request object
  // context.env: Environment variables set in Cloudflare
  // context.params: Route parameters (e.g., for /api/items/[id])
  // context.waitUntil: For background tasks
  // context.next: For middleware / chaining functions

  try {
    // Pass the Cloudflare request and a minimal context (if needed by serverless-http or underlying app)
    // serverless-http is generally designed to work with AWS Lambda event/context signatures,
    // but it often adapts or can be used with other environments by passing the Request object.
    return await handler(context.request, { env: context.env });
  } catch (e) {
    console.error("Error in Cloudflare Function handler:", e);
    return new Response("Internal Server Error in API function.", { status: 500 });
  }
} 