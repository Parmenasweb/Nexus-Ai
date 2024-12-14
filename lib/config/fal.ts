import { fal } from "@fal-ai/client";

export const initializeFalAI = () => {
  // Configure fal client to use our proxy
  fal.config({
    proxyUrl: "/api/fal/proxy",
    requestMiddleware: (request) => {
      // Add custom headers or modify request if needed
      return request;
    },
    credentials: 'include',
  });
};