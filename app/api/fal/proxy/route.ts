import { route } from "@fal-ai/server-proxy/nextjs";

// Add custom logic for POST requests
export const POST = async (req: Request) => {
  try {
    // Add request tracking
    console.log("FAL.AI Request:", {
      targetUrl: req.headers.get("x-fal-target-url"),
      timestamp: new Date().toISOString(),
    });

    // Basic rate limiting (implement proper rate limiting in production)
    const requestsPerMinute = 10;
    // Implement rate limiting logic here

    // Execute the proxy handler
    const response = await route.POST(req);
    
    // Log successful responses
    console.log("FAL.AI Response successful");
    
    return response;
  } catch (error) {
    console.error("FAL.AI Request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to process image request" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// For GET requests, use the built-in proxy handler
export const { GET } = route;