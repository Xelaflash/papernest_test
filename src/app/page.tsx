import Link from 'next/link';

import { getCountries } from './actions/getCountries';

export default async function Home() {
  const countries = await getCountries();

  // TODO: UI + error handling (not found)
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>Energy Offer Comparator</h1>
      <p>Please select a country</p>
      <ul>
        {countries.map(country => (
          <li key={country}>
            <Link href={`/${country}`}>{country}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
