import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display the homepage correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/EnergyCompare/);

    await expect(
      page.getByRole('heading', { name: /Energy offers comparator/i })
    ).toBeVisible();

    await expect(page.getByText(/Find the perfect energy plan/i)).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /Select your country/i })
    ).toBeVisible();
  });

  test('should display country links', async ({ page }) => {
    await page.goto('/');

    const franceLink = page.getByRole('link', { name: /FRANCE/i });
    const italyLink = page.getByRole('link', { name: /ITALY/i });
    const spainLink = page.getByRole('link', { name: /SPAIN/i });

    await expect(franceLink).toBeVisible();
    await expect(italyLink).toBeVisible();
    await expect(spainLink).toBeVisible();
  });

  test('should navigate to country page when clicking a country', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /FRANCE/i }).click();

    await page.waitForURL('**/france**');

    await expect(
      page.getByRole('heading', { name: /Energy offers in france/i })
    ).toBeVisible();
  });

  test('should have navigation and footer', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(
      page.getByRole('link', { name: /EnergyCompare/i }).first()
    ).toBeVisible();

    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByText(/© 202\d EnergyCompare/)).toBeVisible();
  });
});
