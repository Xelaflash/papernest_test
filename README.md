# ⚡ EnergyCompare

An energy offers comparison platform built with Next.js 15. Browse and compare energy plans across multiple countries.

## ✨ Features

-  **Multi-country** - Compare energy offers across France, Italy, and Spain
-  **Filtering** - Filter by provider, energy type, contract duration, and price guarantee
-  **Sorting** - Sort offers by price (ascending/descending)
-  **Flexible Pricing Views** - Toggle between monthly and annual price displays
-  **Best Price Highlighting** - Automatically identifies and highlights the cheapest offer


## 🚀 Getting Started

### Prerequisites

- `Node.js` 20+ and `pnpm` installed

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Variable
Add this environment variable

```
BASE_URL = http://localhost:3000
```

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 🧪 Testing

The project includes both unit tests (Jest + React Testing Library) and end-to-end tests (Playwright).

### Run Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### Run E2E Tests

```bash
# Run all Playwright tests
pnpm test:e2e

# Run Playwright tests with UI
pnpm test:e2e:ui
```

### Test Coverage

- **Components**: OfferCard, OffersFilters
- **Business Logic**: Filtering, sorting, price calculations
- **E2E Flows**: Homepage navigation, country selection, offer filtering

## 📡 API Routes

### GET `/api/countries`

Returns a list of available countries.

**Response:**
```json
["france", "italy", "spain"]
```

**Error Response:**
```json
{
  "message": "Server error"
}
```

### GET `/api/offers`

Returns filtered and sorted energy offers.

**Query Parameters:**
- `country` - Filter by country (e.g., `france`, `italy`, `spain`)
- `provider` - Filter by provider name
- `energyType` - Filter by energy type (`green`, `mixed`, etc.)
- `contractDuration` - Filter by contract duration (`12 months`, `24 months`, etc.)
- `priceGuarantee` - Filter by price guarantee type (`fixed`, `variable`)
- `sortBy` - Sort results (`price-asc`, `price-desc`)

**Example Request:**
```
GET /api/offers?country=spain&provider=Sol Power&energyType=green
```

**Response:**
```json
[
    {
        "id": "offer_es_002_02",
        "slug": "sol-power-solar",
        "name": "Sol Solar",
        "description": "Energía solar pura para tu hogar",
        "provider_id": "es_002",
        "consumption_pricing": 0.215,
        "subscription_cost": 155,
        "metadata": {
            "energy_type": "green",
            "contract_duration": "36 months",
            "price_guarantee": "fixed"
        },
        "provider": {
            "id": "es_002",
            "slug": "sol-power",
            "display_name": "Sol Power",
            "country": "spain"
        },
        "annual_price": 241,
        "monthly_price": 20.08
    }
]
```

## 🗂️ Project Structure

```
src/
├── app/
│   ├── actions/          # Server actions
│   ├── api/              # API routes
│   ├── [country]/        # Country-specific pages
│   └── page.tsx          # Homepage
├── components/           # React components
│   └── __tests__/        # Component tests
├── data/                 # Static data (offers, providers)
├── lib/                  # Business logic & utilities
│   └── __tests__/        # Unit tests
└── types/                # TypeScript types
e2e/                      # Playwright E2E tests
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library, Playwright
- **Code Quality**: ESLint, Prettier


## 📝 Code Quality

```bash
# Run linter
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check
```

---
