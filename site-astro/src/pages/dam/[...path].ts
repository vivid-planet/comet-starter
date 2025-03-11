import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
    const targetUrl = process.env.API_URL_INTERNAL+`/dam/${params.path}`;
  
    const proxyResponse = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'manual',
      });
  
    return new Response(proxyResponse.body, {
        status: proxyResponse.status,
        headers: proxyResponse.headers,
    });
}
