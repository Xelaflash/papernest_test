'use server';

export const getCountries = async (): Promise<string[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/countries`);

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  return response.json();
};
