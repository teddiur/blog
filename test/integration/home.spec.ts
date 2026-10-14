import { test, expect } from '@playwright/test';
import { NavigationBar } from './pages/NavigationBar';

test.describe('Home page', () => {
  test('renders the title, heading and welcome message', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Home');
    await expect(page.locator('h1.title')).toHaveText('Home');
    await expect(page.getByText('Seja bem vindo e bem vinda!')).toBeVisible();
  });

  test('shows the menu bar with all navigation links in desktop mode', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    const menu = new NavigationBar(page);
    await menu.expectDesktopMenuBar();
  });

  test('toggles the menu bar with the hamburger in mobile mode', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 480, height: 854 });
    await page.goto('/');

    const menu = new NavigationBar(page);
    await menu.expectMobileMenuClosed();
    await menu.openMobileMenu();
  });

  test('menu link navigates to its target page', async ({ page }) => {
    await page.goto('/');

    const menu = new NavigationBar(page);
    await menu.clickLinkAndExpectNavigation('Sobre');
  });
});
