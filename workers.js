addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const data = await request.json();
    const { driverId, position, timestamp } = data;

    if (!driverId || !position || !timestamp) {
      return new Response('Invalid payload', { status: 400 });
    }

    // Log the data (replace with KV storage or database integration)
    console.log(`Received location for driver ${driverId}:`, { position, timestamp });

    // Example: Store in Cloudflare KV (uncomment and configure KV binding)
    // await YOUR_KV_NAMESPACE.put(`location_${driverId}_${timestamp}`, JSON.stringify({ position, timestamp }));

    return new Response('Location updated', { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
