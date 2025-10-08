'use server';

import providers from '@/data/energy_providers.json';

export const getCountries = async (): Promise<string[]> => {
  try {
    const countries = [
      ...new Set(providers.energy_providers.map(provider => provider.country)),
    ];

    return countries;
  } catch (error) {
    throw new Error(`Failed to fetch countries: ${error}`);
  }
};
