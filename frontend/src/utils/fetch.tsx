const API_URL_BACK = process.env.NEXT_PUBLIC_API_URL_BACK || "http://localhost:8000";

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const url = `${API_URL_BACK}${endpoint}`;
  const response = await fetch(url, {
    ...options,
  });


  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message || "Une erreur est survenue"
    );
  }

  return response.json();
}