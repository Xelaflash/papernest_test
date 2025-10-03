import { NextResponse } from 'next/server';

import offers from '@/data/energy_offers.json';
import providers from '@/data/energy_providers.json';
import type { Offer, Provider } from '@/types/energy';

interface OfferWithProvider extends Offer {
  provider: Provider | undefined;
}

export async function GET(): Promise<NextResponse<OfferWithProvider[]>> {
  const result: OfferWithProvider[] = offers.energy_offers.map(
    (offer: Offer) => {
      const provider = providers.energy_providers.find(
        (provider: Provider) => provider.id === offer.provider_id
      );

      return {
        ...offer,
        provider,
      };
    }
  );

  return NextResponse.json(result);
}
