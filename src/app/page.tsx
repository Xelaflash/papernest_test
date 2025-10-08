import Link from 'next/link';

import { getCountries } from './actions/getCountries';

export default async function Home() {
  let countries: string[] = [];
  let errorMsg = '';

  try {
    countries = await getCountries();
  } catch {
    errorMsg = 'Failed to load countries. Please try again later.';
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-green-700 to-teal-200 bg-clip-text py-2 text-5xl font-bold text-transparent">
          Energy offers comparator
        </h1>
        <p className="text-lg text-emerald-800">
          Find the perfect energy plan tailored to your needs
        </p>
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-600 bg-white p-8 shadow-lg shadow-teal-800/10 backdrop-blur-sm">
        <h2 className="mb-6 text-center text-xl font-semibold text-emerald-800">
          Select your country to get started:
        </h2>

        {errorMsg ? (
          <div
            className="rounded-lg bg-red-50 p-4 text-red-700 shadow-sm"
            role="alert"
          >
            {errorMsg}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {countries.map(country => (
              <Link
                key={country}
                aria-label={`View energy offers for ${country.toUpperCase()}`}
                href={`/${country}`}
                className="rounded-lg bg-emerald-800 p-4 text-center text-xl font-bold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-black/50"
              >
                <span className="transition-colors group-hover:text-emerald-600">
                  {country.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
