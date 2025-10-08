import type { OfferWithProvider } from '@/types/energy';

import { capitalizeWords, cn } from '@/lib/utils';

interface OfferCardProps {
  offer: OfferWithProvider;
  priceView: 'annual' | 'monthly';
  isCheapest?: boolean;
}

// Style constants
const cardStyles =
  'group rounded-xl border border-emerald-600 bg-white/90 p-6 shadow-lg shadow-emerald-700/10 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-800/10';
const titleStyles =
  'text-2xl font-bold text-emerald-900 group-hover:text-emerald-700';
const providerStyles = 'mt-1 text-base font-medium text-emerald-900';
const iconContainerStyles = 'rounded-full bg-emerald-100 p-2';
const iconStyles = 'h-5 w-5 text-emerald-600';
const descriptionStyles =
  'mb-4 text-sm leading-relaxed text-emerald-800/80 h-12';
const metadataContainerStyles =
  'mb-4 space-y-2 rounded-lg bg-emerald-50/80 p-4';
const metadataRowStyles = 'flex justify-between text-sm';
const metadataLabelStyles = 'text-emerald-700';
const metadataValueStyles = 'font-semibold text-emerald-900';
const priceContainerStyles =
  'rounded-lg border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 p-4';
const priceMainStyles = 'text-3xl font-bold text-emerald-700';
const priceUnitStyles = 'text-base font-medium text-emerald-600';
const priceSecondaryStyles = 'text-base font-medium text-emerald-700';

const OfferCard = ({ offer, priceView, isCheapest }: OfferCardProps) => {
  return (
    <article
      key={offer.id}
      className={cn(
        cardStyles,
        isCheapest && 'scale-[1.02] border-2 border-emerald-500'
      )}
    >
      {isCheapest && (
        <div className="absolute -top-5 left-1/2 mb-3 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-1.5 text-base font-bold text-white shadow-md">
          <svg
            className="h-3.5 w-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Best Price
        </div>
      )}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className={titleStyles}>{offer.name}</h3>
          <p className={providerStyles}>by {offer.provider.display_name}</p>
        </div>
        <div className={iconContainerStyles}>
          <svg
            className={iconStyles}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
            <title>Energy icon</title>
          </svg>
        </div>
      </div>

      <p className={descriptionStyles}>{offer.description}</p>

      <div className={metadataContainerStyles}>
        <div className={metadataRowStyles}>
          <span className={metadataLabelStyles}>
            Subscription Cost (yearly):
          </span>
          <span className={metadataValueStyles}>
            {offer.subscription_cost} €
          </span>
        </div>{' '}
        <div className={metadataRowStyles}>
          <span className={metadataLabelStyles}>Energy Type:</span>
          <span className={metadataValueStyles}>
            {capitalizeWords(offer.metadata.energy_type)}
          </span>
        </div>
        <div className={metadataRowStyles}>
          <span className={metadataLabelStyles}>Contract Duration:</span>
          <span className={metadataValueStyles}>
            {capitalizeWords(offer.metadata.contract_duration)}
          </span>
        </div>
        <div className={metadataRowStyles}>
          <span className={metadataLabelStyles}>Price Guarantee:</span>
          <span className={metadataValueStyles}>
            {capitalizeWords(offer.metadata.price_guarantee)}
          </span>
        </div>
      </div>

      <div className={priceContainerStyles}>
        {priceView === 'annual' ? (
          <>
            <div className="mb-1 flex items-baseline justify-between">
              <span className={priceMainStyles}>{offer.annual_price} €</span>
              <span className={priceUnitStyles}>/year</span>
            </div>
            <p className={priceSecondaryStyles}>
              or {offer.monthly_price} € /month
            </p>
          </>
        ) : (
          <>
            <div className="mb-1 flex items-baseline justify-between">
              <span className={priceMainStyles}>{offer.monthly_price} €</span>
              <span className={priceUnitStyles}>/month</span>
            </div>
            <p className={priceSecondaryStyles}>
              or {offer.annual_price} € /year
            </p>
          </>
        )}
      </div>
    </article>
  );
};

export { OfferCard };
