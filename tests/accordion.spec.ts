import { test, expect } from '@playwright/test';

test('Accordion toggles open/closed on click', async ({ page }) => {
  await page.goto('/');

  // 1) Find the accordion button by its accessible name (the title text)
  // Replace "Your accordion title" with the actual title text in your UI.
  const trigger = page.getByRole('button', { name: 'What is WCAG?' });

  // 2) Closed state: aria-expanded should be "false"
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  // 3) Click to open
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  // 4) The controlled region should now be visible
  // We can find it via role="region"
  const panel = page.getByRole('region');
  await expect(panel).toBeVisible();

  // 5) Click to close
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  // When `hidden` is true, Playwright treats it as not visible
  await expect(panel).not.toBeVisible();
});

test('Accordion can be toggled with keyboard (Enter)', async ({ page }) => {
  await page.goto('/');

  const trigger = page.getByRole('button', { name: 'What is WCAG?' });
  await expect(trigger).toBeVisible();

  // Put focus on the button (reliable)
  await trigger.focus();
  await expect(trigger).toBeFocused();

  // Enter should toggle open
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  // Enter again should toggle closed
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});
