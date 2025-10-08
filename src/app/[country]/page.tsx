import { notFound } from 'next/navigation';

import { getCountries } from '@/app/actions/getCountries';

import { OffersFilters } from '@/components/OffersFilters';

import { filterOffers, getAllOffers } from '@/lib/offers';

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
  const resolvedSearchParams = await searchParams;

  if (!country) {
    notFound();
  }

  const validCountries = await getCountries();
  if (!validCountries.includes(country)) {
    notFound();
  }

  const allOffers = getAllOffers().filter(
    o => o.provider.country.toLowerCase() === country.toLowerCase()
  );

  const filteredOffers = filterOffers(allOffers, {
    country,
    ...resolvedSearchParams,
  });

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
