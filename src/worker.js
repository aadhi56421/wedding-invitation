const MAX_NAME_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 500;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/wishes') {
      if (request.method === 'GET') return listWishes(env);
      if (request.method === 'POST') return createWish(request, env);
      return new Response('Method not allowed', { status: 405 });
    }

    return env.ASSETS.fetch(request);
  },
};

async function listWishes(env) {
  const { results } = await env.DB.prepare(
    'SELECT id, name, message, created_at FROM wishes ORDER BY id DESC LIMIT 200'
  ).all();
  return Response.json(results);
}

async function createWish(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid request body', { status: 400 });
  }

  const name = String(body?.name ?? '').trim().slice(0, MAX_NAME_LENGTH);
  const message = String(body?.message ?? '')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);

  if (!name || !message) {
    return new Response('Name and message are required', { status: 400 });
  }

  const created = await env.DB.prepare(
    'INSERT INTO wishes (name, message) VALUES (?, ?) RETURNING id, name, message, created_at'
  )
    .bind(name, message)
    .first();

  return Response.json(created, { status: 201 });
}
