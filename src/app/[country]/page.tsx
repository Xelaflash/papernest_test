import { getOffers } from '@/app/actions/getOffers';

import { getCountries } from '../actions/getCountries';

interface CountryPageProps {
  params: {
    country: string;
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const data = await getOffers({ country: params.country });

  // TODO: UI + error handling (not found)
  return (
    <div className="flex min-h-screen flex-col p-24">
      <h1>Energy Offers in {params.country}</h1>
      {data.map(offer => (
        <div key={offer.id} className="my-2 border border-red-500">
          <h2 className="text-2xl font-bold">{offer.name}</h2>
          <p>{offer.description}</p>
          <p>{offer.provider.display_name}</p>
          <hr />
          <h3 className="text-lg font-bold underline">Price</h3>
          <ul>
            <li>Consumption pricing: {offer.consumption_pricing} €/kWh</li>
            <li>Subscription cost: {offer.subscription_cost} €</li>
          </ul>
          <hr />
          <h3 className="text-lg font-bold underline">Metadata</h3>
          <ul>
            <li>Energy type: {offer.metadata.energy_type}</li>
            <li>Contract duration: {offer.metadata.contract_duration}</li>
            <li>Price guarantee: {offer.metadata.price_guarantee}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

// Static Generation of all country page at build time
export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map(country => ({
    country,
  }));
}
