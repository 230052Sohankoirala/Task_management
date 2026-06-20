export async function withFallback(request, fallback) {
  try {
    const response = await request();
    return response.data;
  } catch {
    return typeof fallback === "function" ? fallback() : fallback;
  }
}
