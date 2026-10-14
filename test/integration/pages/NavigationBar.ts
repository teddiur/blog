import { expect, type Locator, type Page } from '@playwright/test';

export interface MenuLink {
  text: string;
  href: string;
}

export const MENU_LINKS: MenuLink[] = [
  { text: 'Home', href: '/' },
  { text: 'Sobre', href: '/sobre' },
  { text: 'Posts', href: '/posts/' },
  { text: 'Tags', href: '/tags/' },
  { text: 'Contador', href: '/util/char-counter' },
];

export class NavigationBar {
  constructor(private readonly page: Page) {}

  get nav(): Locator {
    return this.page.locator('header > nav');
  }

  get navLinks(): Locator {
    return this.nav.locator('.nav-links');
  }

  get links(): Locator {
    return this.navLinks.locator('a');
  }

  get hamburger(): Locator {
    return this.nav.locator('.hamburger');
  }

  private link(text: string): Locator {
    return this.links.filter({ hasText: text });
  }

  /**
   * Asserts the menu bar exists and contains the full set of expected links
   * (text and href), regardless of whether they are currently visible.
   */
  async expectMenuStructure(): Promise<void> {
    await expect(this.nav).toBeAttached();
    await expect(this.links).toHaveCount(MENU_LINKS.length);

    for (const { text, href } of MENU_LINKS) {
      const a = this.link(text);
      await expect(a).toBeAttached();
      await expect(a).toHaveText(text);
      await expect(a).toHaveAttribute('href', href);
    }
  }

  private expectAllLinksVisible(): Promise<void[]> {
    return Promise.all(
      MENU_LINKS.map(({ text }) => expect(this.link(text)).toBeVisible()),
    );
  }

  async expectDesktopMenuBar(): Promise<void> {
    await this.expectMenuStructure();
    await expect(this.navLinks).toBeVisible();
    await this.expectAllLinksVisible();
    await expect(this.hamburger).toBeHidden();
  }

  async expectMobileMenuClosed(): Promise<void> {
    await this.expectMenuStructure();
    await expect(this.hamburger).toBeVisible();
    await expect(this.navLinks).toBeHidden();
  }

  async openMobileMenu(): Promise<void> {
    await this.hamburger.click();
    await expect(this.navLinks).toBeVisible();
    await this.expectAllLinksVisible();
  }

  async clickLinkAndExpectNavigation(text: string): Promise<void> {
    const { href } = MENU_LINKS.find((l) => l.text === text);
    if (!href) throw new Error(`Unknown menu link: ${text}`);
    await this.link(text).click();
    await expect(this.page).toHaveURL(href);
  }
}
