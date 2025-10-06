import { getCountries } from '@/app/actions/getCountries';
import { getOffers } from '@/app/actions/getOffers';

import { OffersFilters } from '@/components/OffersFilters';

interface CountryPageProps {
  params: {
    country: string;
  };
  searchParams: {
    provider?: string;
    energyType?: string;
    contractDuration?: string;
    priceGuarantee?: string;
    sortBy?: string;
  };
}

export default async function CountryPage({
  params,
  searchParams,
}: CountryPageProps) {
  const { country } = await params;

  const allOffers = await getOffers({ country });

  const queryParams = new URLSearchParams({
    country,
    ...Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value)
    ),
  });

  // Fetch filtered offers
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(
    `${baseUrl}/api/offers?${queryParams.toString()}`
  );
  const filteredOffers = await response.json();

  return (
    <OffersFilters
      offers={filteredOffers}
      country={country}
      allOffers={allOffers}
    />
  );
}

// Static Generation of all country page at build time
export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map(country => ({
    country,
  }));
}
