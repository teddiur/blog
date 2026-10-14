import { test, expect } from '@playwright/test';
import { NavigationBar } from './pages/NavigationBar';

test.describe('About (Sobre) page', () => {
  test('renders the title, heading and intro message', async ({ page }) => {
    await page.goto('/sobre');

    await expect(page).toHaveTitle('Sobre mim');
    await expect(page.locator('h1.title')).toHaveText('Sobre mim');
    await expect(page.getByText('... e esse blog de estudo!')).toBeVisible();
    await expect(
      page.getByText(
        'Estou fazendo o tutorial introdutório do Astro para gerar um blog :)',
      ),
    ).toBeVisible();
  });

  test('lists the expected skills', async ({ page }) => {
    await page.goto('/sobre');

    await expect(page.getByText('Minhas habilidades são:')).toBeVisible();

    const items = page.locator('ul li');
    await expect(items).toHaveCount(13);
    await expect(items).toHaveText([
      'Arquitetura de software',
      'Java',
      'OOP',
      'Clojure',
      'FP',
      'Datomic',
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Astro',
      'Python',
      'Processamento de dados',
    ]);
  });

  test('shows the menu bar with all navigation links in desktop mode', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/sobre');

    const menu = new NavigationBar(page);
    await menu.expectDesktopMenuBar();
  });

  test('toggles the menu bar with the hamburger in mobile mode', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 480, height: 854 });
    await page.goto('/sobre');

    const menu = new NavigationBar(page);
    await menu.expectMobileMenuClosed();
    await menu.openMobileMenu();
  });

  test('navigation bar reaches the Sobre page from the home page', async ({
    page,
  }) => {
    await page.goto('/');

    const menu = new NavigationBar(page);
    await menu.clickLinkAndExpectNavigation('Sobre');

    await expect(page).toHaveTitle('Sobre mim');
    await expect(page.locator('h1.title')).toHaveText('Sobre mim');
  });
});
