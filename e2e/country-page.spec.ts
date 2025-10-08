import { expect, test } from '@playwright/test';

test.describe('Country Page', () => {
  test('should load and display country page for valid country', async ({
    page,
  }) => {
    await page.goto('/france');

    await expect(
      page.getByRole('heading', { name: /Energy offers in france/i })
    ).toBeVisible();

    await expect(page.getByLabel(/Provider/i)).toBeVisible();
    await expect(page.getByLabel(/Energy Type/i)).toBeVisible();
    await expect(page.getByLabel(/Contract Duration/i)).toBeVisible();
    await expect(page.getByLabel(/Price Guarantee/i)).toBeVisible();
    await expect(page.getByLabel(/Sort By/i)).toBeVisible();
  });

  test('should display offers for valid country', async ({ page }) => {
    await page.goto('/france');

    await expect(page.getByText(/offer.*found/i)).toBeVisible();

    await expect(
      page.locator('article, [class*="group"]').first()
    ).toBeVisible();

    await expect(page.getByRole('button', { name: /Monthly/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Annual/i })).toBeVisible();

    await expect(page.getByText(/€/).first()).toBeVisible();
  });

  test('should return 404 for invalid country', async ({ page }) => {
    await page.goto('/invalid-country');

    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText(/Page Not Found/i)).toBeVisible();

    const homeButton = page.getByRole('link', { name: /Go Back Home/i });
    await expect(homeButton).toBeVisible();

    await homeButton.click();
    await page.waitForURL('/');
    await expect(
      page.getByRole('heading', { name: /Energy offers comparator/i })
    ).toBeVisible();
  });
});
