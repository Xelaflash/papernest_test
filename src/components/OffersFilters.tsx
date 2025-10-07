'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { OfferWithProvider } from '@/types/energy';

import { getCountryFlag } from '@/lib/country-flag';
import { capitalizeWords, cn } from '@/lib/utils';

import { OfferCard } from './OfferCard';

interface OffersFiltersProps {
  offers: OfferWithProvider[];
  country: string;
  allOffers: OfferWithProvider[];
}

const labelStyles = 'mb-2 block text-base font-bold text-emerald-800';
const selectStyles =
  'w-full rounded-lg border border-emerald-600 bg-white px-4  py-2.5 text-emerald-800 transition-colors focus:border-emerald-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none ';
const toggleButtonStyles =
  'flex-1 rounded-md px-6 py-3 text-base font-semibold transition-all';
const toggleButtonActiveStyles = 'bg-white text-emerald-700 shadow-md';
const toggleButtonInactiveStyles = 'text-emerald-600 hover:text-emerald-800';

const OffersFilters = ({ offers, country, allOffers }: OffersFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceView, setPriceView] = useState<'monthly' | 'annual'>('monthly');

  // Extract unique values for filters from allOffers
  const providers = Array.from(
    new Set(allOffers.map(offer => offer.provider.display_name))
  ).sort();

  const energyTypes = Array.from(
    new Set(allOffers.map(offer => offer.metadata.energy_type))
  ).sort();

  const contractDurations = Array.from(
    new Set(allOffers.map(offer => offer.metadata.contract_duration))
  ).sort();

  const priceGuarantees = Array.from(
    new Set(allOffers.map(offer => offer.metadata.price_guarantee))
  ).sort();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/${country}?${params.toString()}`);
  };

  const countryFlag = getCountryFlag(country);

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-emerald-800 capitalize">
          Energy Offers in {country} {countryFlag}
        </h1>
        <p className="text-emerald-800">
          Compare and find the best energy plan for your needs
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 rounded-xl border border-emerald-600 bg-white/80 p-6 shadow-lg shadow-emerald-900/10">
        <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-emerald-800">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filter Options
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Provider Filter */}
          <div>
            <label htmlFor="provider" className={labelStyles}>
              Provider
            </label>
            <select
              id="provider"
              value={searchParams.get('provider') || 'all'}
              onChange={e => handleFilterChange('provider', e.target.value)}
              className={selectStyles}
            >
              <option value="all">All Providers</option>
              {providers.map(provider => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          {/* Energy Type Filter */}
          <div>
            <label htmlFor="energyType" className={labelStyles}>
              Energy Type
            </label>
            <select
              id="energyType"
              value={searchParams.get('energyType') || 'all'}
              onChange={e => handleFilterChange('energyType', e.target.value)}
              className={selectStyles}
            >
              <option value="all">All Types</option>
              {energyTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Contract Duration Filter */}
          <div>
            <label htmlFor="contractDuration" className={labelStyles}>
              Contract Duration
            </label>
            <select
              id="contractDuration"
              value={searchParams.get('contractDuration') || 'all'}
              onChange={e =>
                handleFilterChange('contractDuration', e.target.value)
              }
              className={selectStyles}
            >
              <option value="all">All Durations</option>
              {contractDurations.map(duration => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          {/* Price Guarantee Filter */}
          <div>
            <label htmlFor="priceGuarantee" className={labelStyles}>
              Price Guarantee
            </label>
            <select
              id="priceGuarantee"
              value={searchParams.get('priceGuarantee') || 'all'}
              onChange={e =>
                handleFilterChange('priceGuarantee', e.target.value)
              }
              className={selectStyles}
            >
              <option value="all">All Guarantees</option>
              {priceGuarantees.map(guarantee => (
                <option key={guarantee} value={guarantee}>
                  {capitalizeWords(guarantee)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className="mt-6 border-t border-emerald-100 pt-6">
          <label htmlFor="sortBy" className={labelStyles}>
            Sort By
          </label>
          <select
            id="sortBy"
            value={searchParams.get('sortBy') || ''}
            onChange={e => handleFilterChange('sortBy', e.target.value)}
            className={cn(selectStyles, 'sm:w-auto sm:min-w-64')}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results and Price View Toggle */}
      <div className="mb-6 flex flex-col gap-4">
        <p className="text-lg font-bold text-emerald-800">
          <span className="text-emerald-800">{offers.length}</span> offer
          {offers.length !== 1 ? 's' : ''} found
        </p>

        {/* Price View Toggle */}
        <div className="my-4">
          <p className={labelStyles}>Billing period</p>
          <div className="flex rounded-lg bg-emerald-100/50 p-2 shadow-inner sm:w-auto sm:min-w-80">
            <button
              onClick={() => setPriceView('monthly')}
              className={cn(
                toggleButtonStyles,
                priceView === 'monthly'
                  ? toggleButtonActiveStyles
                  : toggleButtonInactiveStyles
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setPriceView('annual')}
              className={cn(
                toggleButtonStyles,
                priceView === 'annual'
                  ? toggleButtonActiveStyles
                  : toggleButtonInactiveStyles
              )}
            >
              Annual
            </button>
          </div>
        </div>
      </div>

      {offers.length === 0 ? (
        <div className="rounded-xl bg-white/60 py-16 text-center shadow-sm backdrop-blur-sm">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-emerald-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium text-emerald-700">
            No offers found matching your filters
          </p>
          <p className="mt-2 text-sm text-emerald-600">
            Try adjusting your filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {offers.map(offer => {
            const isCheapest =
              offer.monthly_price ===
              Math.min(...offers.map(o => o.monthly_price));

            return (
              <OfferCard
                key={offer.id}
                offer={offer}
                priceView={priceView}
                isCheapest={isCheapest}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export { OffersFilters };
