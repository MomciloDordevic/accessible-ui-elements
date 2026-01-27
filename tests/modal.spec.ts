import { test, expect } from '@playwright/test';

test('Modal opens and closes with Escape key', async ({ page }) => {
  await page.goto('/');

  const openButton = page.getByRole('button', { name: 'Open Modal' });
  await expect(openButton).toBeVisible();

  await openButton.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('Modal moves focus inside on open and restores it to trigger on close', async ({ page }) => {
  await page.goto('/');

  const openButton = page.getByRole('button', { name: 'Open Modal' });

  // Start with focus on the trigger so we can verify focus restoration later
  await openButton.focus();
  await expect(openButton).toBeFocused();

  // Open modal
  await openButton.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // ✅ Check the real focused element is inside the dialog
  const isFocusInside = await dialog.evaluate((dialogEl) => {
    const active = document.activeElement;
    return !!active && dialogEl.contains(active);
  });
  expect(isFocusInside).toBe(true);

  // Close modal
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();

  // ✅ Focus should return to the open button
  await expect(openButton).toBeFocused();
});
