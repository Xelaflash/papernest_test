// src/lib/offers.ts
import offers from '@/data/energy_offers.json';
import providers from '@/data/energy_providers.json';
import type { Offer, OfferWithProvider, Provider } from '@/types/energy';

const ANNUAL_CONSUMPTION_KWH = 400;

export function getAllOffers(): OfferWithProvider[] {
  return offers.energy_offers.map((offer: Offer) => {
    const provider = providers.energy_providers.find(
      (p: Provider) => p.id === offer.provider_id
    );

    if (!provider) {
      throw new Error(`Provider not found for id: ${offer.provider_id}`);
    }

    const annualConsumptionCost =
      offer.consumption_pricing * ANNUAL_CONSUMPTION_KWH;
    const annualPrice = +(
      offer.subscription_cost + annualConsumptionCost
    ).toFixed(2);
    const monthlyPrice = +(annualPrice / 12).toFixed(2);

    return {
      ...offer,
      provider,
      annual_price: annualPrice,
      monthly_price: monthlyPrice,
    };
  });
}

export function filterOffers(
  data: OfferWithProvider[],
  params: Record<string, string | null>
): OfferWithProvider[] {
  const {
    country,
    provider,
    energyType,
    contractDuration,
    priceGuarantee,
    sortBy,
  } = params;

  let result = [...data];

  if (country) {
    result = result.filter(
      o => o.provider?.country?.toLowerCase() === country.toLowerCase()
    );
  }

  if (provider && provider !== 'all') {
    result = result.filter(o => o.provider?.display_name === provider);
  }

  if (energyType && energyType !== 'all') {
    result = result.filter(o => o.metadata.energy_type === energyType);
  }

  if (contractDuration && contractDuration !== 'all') {
    result = result.filter(
      o => o.metadata.contract_duration === contractDuration
    );
  }

  if (priceGuarantee && priceGuarantee !== 'all') {
    result = result.filter(o => o.metadata.price_guarantee === priceGuarantee);
  }

  if (sortBy === 'price-asc' || sortBy === 'price-desc') {
    const dir = sortBy === 'price-asc' ? 1 : -1;
    result.sort((a, b) => dir * (a.annual_price - b.annual_price));
  }

  return result;
}
