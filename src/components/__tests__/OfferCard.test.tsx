import type { OfferWithProvider } from '@/types/energy';
import { render, screen } from '@testing-library/react';

import { OfferCard } from '../OfferCard';

const mockOffer: OfferWithProvider = {
  id: 'offer_1',
  slug: 'test-offer',
  name: 'Test Energy Offer',
  description: 'This is a test energy offer description',
  provider_id: 'test_001',
  consumption_pricing: 0.15,
  subscription_cost: 100,
  annual_price: 200,
  monthly_price: 16.67,
  metadata: {
    energy_type: 'green',
    contract_duration: '24 months',
    price_guarantee: 'fixed',
  },
  provider: {
    id: 'test_001',
    slug: 'test-provider',
    display_name: 'Test Provider',
    country: 'france',
  },
};

describe('OfferCard', () => {
  describe('Renders offer details correctly', () => {
    it('should render offer name and provider', () => {
      render(<OfferCard offer={mockOffer} priceView="monthly" />);

      expect(screen.getByText('Test Energy Offer')).toBeInTheDocument();
      expect(screen.getByText('by Test Provider')).toBeInTheDocument();
    });

    it('should render metadata with correct capitalization', () => {
      render(<OfferCard offer={mockOffer} priceView="monthly" />);

      expect(
        screen.getByText('Subscription Cost (yearly):')
      ).toBeInTheDocument();
      expect(screen.getByText('100 €')).toBeInTheDocument();

      expect(screen.getByText('Energy Type:')).toBeInTheDocument();
      expect(screen.getByText('Green')).toBeInTheDocument();

      expect(screen.getByText('Contract Duration:')).toBeInTheDocument();
      expect(screen.getByText('24 months')).toBeInTheDocument();

      expect(screen.getByText('Price Guarantee:')).toBeInTheDocument();
      expect(screen.getByText('Fixed')).toBeInTheDocument();
    });
  });

  describe('Displays monthly vs annual price based on priceView prop', () => {
    it('should display monthly price when priceView is "monthly"', () => {
      render(<OfferCard offer={mockOffer} priceView="monthly" />);

      expect(screen.getByText('16.67 €')).toBeInTheDocument();
      expect(screen.getByText('/month')).toBeInTheDocument();

      expect(screen.getByText(/or 200 € \/year/)).toBeInTheDocument();
    });

    it('should display annual price when priceView is "annual"', () => {
      render(<OfferCard offer={mockOffer} priceView="annual" />);

      expect(screen.getByText('200 €')).toBeInTheDocument();
      expect(screen.getByText('/year')).toBeInTheDocument();

      expect(screen.getByText(/or 16.67 € \/month/)).toBeInTheDocument();
    });
  });

  describe('Shows "Best Price" badge when isCheapest=true', () => {
    it('should display "Best Price" badge when isCheapest is true', () => {
      render(
        <OfferCard offer={mockOffer} priceView="monthly" isCheapest={true} />
      );

      expect(screen.getByText('Best Price')).toBeInTheDocument();
    });
  });
});
