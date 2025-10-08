import { useRouter, useSearchParams } from 'next/navigation';

import type { OfferWithProvider } from '@/types/energy';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OffersFilters } from '../OffersFilters';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/lib/country-flag', () => ({
  getCountryFlag: jest.fn(() => '🇫🇷'),
}));

const mockRouter = {
  push: jest.fn(),
};

const ANNUAL_CONSUMPTION_KWH = 400;

function calculatePrices(
  consumption_pricing: number,
  subscription_cost: number
) {
  const annualConsumptionCost = consumption_pricing * ANNUAL_CONSUMPTION_KWH;
  const annual_price = +(subscription_cost + annualConsumptionCost).toFixed(2);
  const monthly_price = +(annual_price / 12).toFixed(2);
  return { annual_price, monthly_price };
}

const offer1Prices = calculatePrices(0.1, 100); // 100 + (0.1 * 400) = 140, monthly = 11.67
const offer2Prices = calculatePrices(0.2, 200); // 200 + (0.2 * 400) = 280, monthly = 23.33

const mockOffers: OfferWithProvider[] = [
  {
    id: 'offer_1',
    slug: 'test-offer-1',
    name: 'Cheap Offer',
    description: 'Cheapest offer',
    provider_id: 'fr_001',
    consumption_pricing: 0.1,
    subscription_cost: 100,
    annual_price: offer1Prices.annual_price,
    monthly_price: offer1Prices.monthly_price,
    metadata: {
      energy_type: 'green',
      contract_duration: '12 months',
      price_guarantee: 'fixed',
    },
    provider: {
      id: 'fr_001',
      slug: 'provider-1',
      display_name: 'Provider 1',
      country: 'france',
    },
  },
  {
    id: 'offer_2',
    slug: 'test-offer-2',
    name: 'Expensive Offer',
    description: 'More expensive offer',
    provider_id: 'fr_002',
    consumption_pricing: 0.2,
    subscription_cost: 200,
    annual_price: offer2Prices.annual_price,
    monthly_price: offer2Prices.monthly_price,
    metadata: {
      energy_type: 'mixed',
      contract_duration: '24 months',
      price_guarantee: 'variable',
    },
    provider: {
      id: 'fr_002',
      slug: 'provider-2',
      display_name: 'Provider 2',
      country: 'france',
    },
  },
];

describe('OffersFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
      toString: jest.fn(() => ''),
    });
  });

  describe('Displays correct number of offers', () => {
    it('should display the correct count for multiple offers', () => {
      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('offers found')).toBeInTheDocument();
    });

    it('should display singular "offer" for single result', () => {
      render(
        <OffersFilters
          offers={[mockOffers[0]]}
          country="france"
          allOffers={mockOffers}
        />
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('offer found')).toBeInTheDocument();
    });

    it('should display "0 offers found" when no results', () => {
      render(
        <OffersFilters offers={[]} country="france" allOffers={mockOffers} />
      );

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('offers found')).toBeInTheDocument();
    });
  });

  describe('Toggle between monthly/annual view', () => {
    it('should render both toggle buttons', () => {
      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      expect(
        screen.getByRole('button', { name: /monthly/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /annual/i })
      ).toBeInTheDocument();
    });

    it('should toggle to annual view when Annual button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      const annualButton = screen.getByRole('button', { name: /annual/i });
      await user.click(annualButton);

      await waitFor(() => {
        expect(screen.getByText('140 €')).toBeInTheDocument();
        expect(screen.getByText('280 €')).toBeInTheDocument();
      });
    });

    it('should toggle back to monthly view', async () => {
      const user = userEvent.setup();

      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      const annualButton = screen.getByRole('button', { name: /annual/i });
      const monthlyButton = screen.getByRole('button', { name: /monthly/i });

      await user.click(annualButton);

      await user.click(monthlyButton);

      await waitFor(() => {
        expect(screen.getByText('11.67 €')).toBeInTheDocument();
        expect(screen.getByText('23.33 €')).toBeInTheDocument();
      });
    });
  });

  describe('Shows "no results" state when offers.length === 0', () => {
    it('should display no results message', () => {
      render(
        <OffersFilters offers={[]} country="france" allOffers={mockOffers} />
      );

      expect(
        screen.getByText('No offers found matching your filters')
      ).toBeInTheDocument();
    });
  });

  describe('Marks cheapest offer correctly', () => {
    it('should mark the cheapest offer with "Best Price" badge', () => {
      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      const bestPriceBadges = screen.getAllByText('Best Price');

      expect(bestPriceBadges).toHaveLength(1);
    });

    it('should apply cheapest styling to the correct offer', () => {
      const { container } = render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      const cheapestCard = container.querySelector(
        '[class*="border-2"][class*="border-emerald-500"]'
      );
      expect(cheapestCard).toBeInTheDocument();
    });

    it('should handle equal prices correctly', () => {
      const equalOffers = [
        { ...mockOffers[0], monthly_price: 15 },
        { ...mockOffers[1], monthly_price: 15 },
      ];

      render(
        <OffersFilters
          offers={equalOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      const bestPriceBadges = screen.getAllByText('Best Price');
      expect(bestPriceBadges.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Filter rendering and interaction', () => {
    it('should render all filter dropdowns', () => {
      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      expect(screen.getByLabelText(/provider/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/energy type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contract duration/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/price guarantee/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
    });

    it('should display country name in heading', () => {
      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      // Check for the heading containing both parts of the text
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(/Energy offers in/i);
      expect(heading).toHaveTextContent(/france/i);
    });

    it('should call router.push when filter changes', async () => {
      const user = userEvent.setup();

      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      const providerSelect = screen.getByLabelText(/provider/i);
      await user.selectOptions(providerSelect, 'Provider 1');

      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalled();
      });
    });
  });

  describe('Offer cards rendering', () => {
    it('should render all offer cards when results exist', () => {
      render(
        <OffersFilters
          offers={mockOffers}
          country="france"
          allOffers={mockOffers}
        />
      );

      expect(screen.getByText('Cheap Offer')).toBeInTheDocument();
      expect(screen.getByText('Expensive Offer')).toBeInTheDocument();
    });
  });
});
