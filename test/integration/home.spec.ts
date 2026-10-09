import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('renders the title, heading and welcome message', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Home');
    await expect(page.locator('h1.title')).toHaveText('Home');
    await expect(page.getByText('Seja bem vindo e bem vinda!')).toBeVisible();
  });
});
