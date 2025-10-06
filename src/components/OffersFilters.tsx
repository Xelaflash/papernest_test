'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { OfferWithProvider } from '@/types/energy';

interface OffersFiltersProps {
  offers: OfferWithProvider[];
  country: string;
  allOffers: OfferWithProvider[];
}

const OffersFilters = ({ offers, country, allOffers }: OffersFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceView, setPriceView] = useState<'monthly' | 'annual'>('annual');

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Energy Offers in {country}
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Provider Filter */}
          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
              Provider
            </label>
            <select
              id="provider"
              value={searchParams.get('provider') || 'all'}
              onChange={(e) => handleFilterChange('provider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label htmlFor="energyType" className="block text-sm font-medium text-gray-700 mb-2">
              Energy Type
            </label>
            <select
              id="energyType"
              value={searchParams.get('energyType') || 'all'}
              onChange={(e) => handleFilterChange('energyType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {energyTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Contract Duration Filter */}
          <div>
            <label htmlFor="contractDuration" className="block text-sm font-medium text-gray-700 mb-2">
              Contract Duration
            </label>
            <select
              id="contractDuration"
              value={searchParams.get('contractDuration') || 'all'}
              onChange={(e) => handleFilterChange('contractDuration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label htmlFor="priceGuarantee" className="block text-sm font-medium text-gray-700 mb-2">
              Price Guarantee
            </label>
            <select
              id="priceGuarantee"
              value={searchParams.get('priceGuarantee') || 'all'}
              onChange={(e) => handleFilterChange('priceGuarantee', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Guarantees</option>
              {priceGuarantees.map(guarantee => (
                <option key={guarantee} value={guarantee}>
                  {guarantee}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className="mt-4">
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sortBy"
            value={searchParams.get('sortBy') || ''}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results and Price View Toggle */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          Showing {offers.length} offer{offers.length !== 1 ? 's' : ''}
        </p>

        {/* Price View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setPriceView('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              priceView === 'monthly'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPriceView('annual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              priceView === 'annual'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      {/* Offers Grid */}
      {offers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No offers found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{offer.name}</h3>
                <p className="text-sm text-gray-600">{offer.provider.display_name}</p>
              </div>

              <p className="text-gray-700 mb-4">{offer.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Energy Type:</span>
                  <span className="font-medium">{offer.metadata.energy_type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Contract Duration:</span>
                  <span className="font-medium">{offer.metadata.contract_duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price Guarantee:</span>
                  <span className="font-medium">{offer.metadata.price_guarantee}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                {priceView === 'annual' ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-blue-600">
                        €{offer.annual_price}
                      </span>
                      <span className="text-sm text-gray-500">/year</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      €{offer.monthly_price}/month
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-blue-600">
                        €{offer.monthly_price}
                      </span>
                      <span className="text-sm text-gray-500">/month</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      €{offer.annual_price}/year
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { OffersFilters };
