import fs from 'node:fs';
import { createRequire } from 'node:module';
import { test, expect } from '@playwright/test';

const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

async function assertAutomatedAccessibility(page) {
  await page.addScriptTag({ content: axeSource });
  const result = await page.evaluate(async () => window.axe.run(document, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'],
    },
  }));
  expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
}

async function openReader(page) {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/index.html');
  await expect(page.getByRole('heading', { level: 1, name: 'Your Library' })).toBeVisible();
  return requests;
}

test('renders the synthetic foundation without remote application requests', async ({ page }) => {
  const requests = await openReader(page);
  await expect(page.getByText('0.0.4-foundation', { exact: true })).toBeVisible();
  await expect(page.getByText('No personal media is loaded or transmitted.')).toBeVisible();
  expect(requests.length).toBeGreaterThan(0);
  for (const url of requests) {
    expect(new URL(url).origin).toBe('http://127.0.0.1:4173');
  }
  await assertAutomatedAccessibility(page);
});

test('supports keyboard focus, filtering, search, detail, and fail-closed actions', async ({ page }) => {
  await openReader(page);

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();

  const manga = page.getByRole('button', { name: 'Manga', exact: true });
  await manga.focus();
  await page.keyboard.press('Enter');
  await expect(manga).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { level: 2, name: 'Mangas' })).toBeVisible();
  await expect(page.locator('#resultCount')).toContainText('2 synthetic titles');

  const search = page.getByRole('searchbox', { name: 'Search library' });
  await search.fill('Lantern');
  await expect(page.locator('#resultCount')).toContainText('1 synthetic title');
  await expect(page.getByRole('button', { name: 'Open synthetic details for Lantern District' })).toBeVisible();

  await search.fill('does-not-exist');
  await expect(page.getByText('No synthetic titles match.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(search).toBeFocused();
  await expect(page.locator('#resultCount')).toContainText('2 synthetic titles');

  const opener = page.getByRole('button', { name: 'Open synthetic details for Lantern District' });
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Lantern District' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '67');
  await assertAutomatedAccessibility(page);

  await dialog.getByRole('button', { name: 'Read' }).click();
  await expect(page.getByRole('status')).toContainText('Not implemented');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();

  await page.getByRole('button', { name: 'Import' }).click();
  await expect(page.getByRole('status')).toContainText('Import is intentionally unavailable');
});

test('preserves responsive composition and reduced-motion behavior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openReader(page);

  const shellColumns = await page.locator('.app-shell').evaluate(element => getComputedStyle(element).gridTemplateColumns);
  const topbarDirection = await page.locator('.topbar').evaluate(element => getComputedStyle(element).flexDirection);
  const transitionDuration = await page.locator('.cover').first().evaluate(element => getComputedStyle(element).transitionDuration);

  expect(shellColumns.split(' ').length).toBe(1);
  expect(topbarDirection).toBe('column');
  expect(transitionDuration.split(',').every(value => value.trim() === '0s')).toBe(true);
  await assertAutomatedAccessibility(page);
});
