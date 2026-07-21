const API_URL = process.env.API_URL

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
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