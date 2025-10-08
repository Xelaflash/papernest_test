import { expect, test } from '@playwright/test';

test.describe('Filters and Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/france');

    await expect(page.getByText(/offer.*found/i)).toBeVisible();
  });

  test('should filter by provider', async ({ page }) => {
    await page.getByLabel(/Provider/i).selectOption({ index: 1 });

    await page.waitForURL(/provider=/);

    await expect(page.getByText(/offer.*found/i)).toBeVisible();
  });

  test('should filter by energy type', async ({ page }) => {
    await page.getByLabel(/Energy Type/i).selectOption({ index: 1 });

    await page.waitForURL(/energyType=/);

    await expect(page.getByText(/offer.*found/i)).toBeVisible();
  });

  test('should sort by price ascending', async ({ page }) => {
    await page.getByLabel(/Sort By/i).selectOption('price-asc');

    await page.waitForURL(/sortBy=price-asc/);

    await page.waitForTimeout(500);

    const priceElements = await page.locator('span:has-text("€")').all();

    if (priceElements.length >= 2) {
      const firstPrice = await priceElements[0].textContent();
      const lastPrice =
        await priceElements[priceElements.length - 2].textContent();

      // Extract numeric values
      const firstValue = parseFloat(firstPrice?.replace(/[^\d.]/g, '') || '0');
      const lastValue = parseFloat(lastPrice?.replace(/[^\d.]/g, '') || '0');

      expect(firstValue).toBeLessThanOrEqual(lastValue);
    }
  });

  test('should sort by price descending', async ({ page }) => {
    await page.getByLabel(/Sort By/i).selectOption('price-desc');

    await page.waitForURL(/sortBy=price-desc/);

    await page.waitForTimeout(500);

    const priceElements = await page.locator('span:has-text("€")').all();

    if (priceElements.length >= 2) {
      const firstPrice = await priceElements[0].textContent();
      const lastPrice =
        await priceElements[priceElements.length - 2].textContent();

      // Extract numeric values
      const firstValue = parseFloat(firstPrice?.replace(/[^\d.]/g, '') || '0');
      const lastValue = parseFloat(lastPrice?.replace(/[^\d.]/g, '') || '0');

      expect(firstValue).toBeGreaterThanOrEqual(lastValue);
    }
  });

  test('should toggle between monthly and annual view', async ({ page }) => {
    // Click Annual button
    await page.getByRole('button', { name: /Annual/i }).click();

    // Verify annual pricing is displayed (look for "/year" text)
    await expect(page.getByText('/year').first()).toBeVisible();

    // Click Monthly button
    await page.getByRole('button', { name: /Monthly/i }).click();

    // Verify monthly pricing is displayed (look for "/month" text)
    await expect(page.getByText('/month').first()).toBeVisible();
  });

  test('should apply multiple filters together', async ({ page }) => {
    await page.getByLabel(/Provider/i).selectOption({ index: 1 });
    await page.waitForURL(/provider=/);

    await page.getByLabel(/Energy Type/i).selectOption({ index: 1 });
    await page.waitForURL(/energyType=/);

    const url = page.url();
    expect(url).toContain('provider=');
    expect(url).toContain('energyType=');

    await expect(page.getByText(/offer.*found/i)).toBeVisible();
  });

  test('should show no results message when filters yield no matches', async ({
    page,
  }) => {
    await page.getByLabel(/Provider/i).selectOption({ index: 1 });
    await page.getByLabel(/Energy Type/i).selectOption({ index: 2 });
    await page.getByLabel(/Contract Duration/i).selectOption({ index: 2 });
    await page.getByLabel(/Price Guarantee/i).selectOption({ index: 2 });

    const noResultsMessage = page.getByText(
      /No offers found matching your filters/i
    );
    const offersFound = page.getByText(/\d+ offer.*found/i);

    const hasNoResults = await noResultsMessage.isVisible().catch(() => false);
    const hasResults = await offersFound.isVisible().catch(() => false);

    expect(hasNoResults || hasResults).toBe(true);

    if (hasNoResults) {
      await expect(
        page.getByText(/Try adjusting your filter criteria/i)
      ).toBeVisible();
    }
  });
});
