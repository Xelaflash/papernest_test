import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-emerald-600 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="mb-4 flex items-center justify-center gap-2 text-lg font-bold text-emerald-800 md:justify-start">
              <span className="text-xl">⚡</span>
              <span>EnergyCompare</span>
            </div>
            <p className="text-center text-sm text-emerald-700 md:text-start">
              Compare energy offers and find the best deal for your needs.
            </p>
          </div>

          <div className="mx-auto md:mx-0">
            <h3 className="mb-4 font-semibold text-emerald-800">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-emerald-700 transition-colors hover:text-emerald-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-emerald-700 transition-colors hover:text-emerald-600"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-emerald-600 pt-8 text-center text-sm text-emerald-600">
          © {currentYear} EnergyCompare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export { Footer };
