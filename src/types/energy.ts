export interface Provider {
  id: string;
  slug: string;
  display_name: string;
  country: string;
}

export interface OfferMetadata {
  energy_type: string;
  contract_duration: string;
  price_guarantee: string;
}

export interface Offer {
  id: string;
  slug: string;
  name: string;
  description: string;
  provider_id: string;
  consumption_pricing: number;
  subscription_cost: number;
  metadata: OfferMetadata;
}

export interface OfferWithProvider extends Offer {
  provider: Provider;
  annual_price: number;
  monthly_price: number;
}
