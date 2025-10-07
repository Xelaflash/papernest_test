import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-400px)] flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-extrabold text-emerald-600 select-none">
          404
        </h1>
        <p className="mb-8 text-4xl font-semibold text-emerald-800">
          Page Not Found
        </p>
        <Link
          href="/"
          className="inline-flex transform items-center rounded-full border-2 border-emerald-600 bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:border-emerald-700 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
        >
          Go Back Home
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
