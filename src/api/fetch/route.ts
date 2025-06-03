import { fetchHTML } from "../falabellascraping.ts";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response('Missing "url" parameter', { status: 400 });
  }

  const html = await fetchHTML(url);

  if (html === null) {
    return new Response('Failed to fetch HTML.', { status: 500 });
  }

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}