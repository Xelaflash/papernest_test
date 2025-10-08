import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-emerald-700 transition-colors hover:text-emerald-600"
          >
            <span className="text-2xl" aria-hidden="true">
              ⚡
            </span>
            <span>EnergyCompare</span>
          </Link>
          <div className="flex items-center gap-6">
            <p className="text-sm font-medium text-emerald-700">
              The best comparison tool for energy offers
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
