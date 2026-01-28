import { test, expect } from '@playwright/test';

test('Tabs: click switches the active tab and panel', async ({ page }) => {
  await page.goto('/');

  // 1) Find the tablist (if you have multiple, we’ll scope it later)
  const tablist = page.getByRole('tablist');
  await expect(tablist).toBeVisible();

  // 2) Get the tabs inside that tablist
  const tabs = tablist.getByRole('tab');
  const tabCount = await tabs.count();
  expect(tabCount).toBeGreaterThan(1);

  // 3) Click the second tab
  const firstTab = tabs.nth(0);
  const secondTab = tabs.nth(1);

  await firstTab.click();
  await expect(firstTab).toHaveAttribute('aria-selected', 'true');

  await secondTab.click();
  await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  await expect(firstTab).toHaveAttribute('aria-selected', 'false');

  // 4) Check that the selected tab's panel is visible.
  // Common accessible pattern: tab has aria-controls pointing to tabpanel id.
  const panelId = await secondTab.getAttribute('aria-controls');
  expect(panelId).toBeTruthy();

  const panel = page.locator(`#${panelId}`);
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute('role', 'tabpanel');
});

test('Tabs: Arrow keys move focus between tabs (keyboard navigation)', async ({ page }) => {
  await page.goto('/');

  const tablist = page.getByRole('tablist');
  await expect(tablist).toBeVisible();

  const tabs = tablist.getByRole('tab');
  const firstTab = tabs.nth(0);
  const secondTab = tabs.nth(1);

  // Start focus on first tab
  await firstTab.focus();
  await expect(firstTab).toBeFocused();

  // ArrowRight should move focus to the next tab
  await page.keyboard.press('ArrowRight');
  await expect(secondTab).toBeFocused();

  // ArrowLeft should move focus back
  await page.keyboard.press('ArrowLeft');
  await expect(firstTab).toBeFocused();
});
