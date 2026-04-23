import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

test.slow();

test('public pages are accessible without login', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await expect(page.getByRole('heading', { name: 'Cycle5ense' })).toBeVisible({ timeout: 10000 });

  await page.goto(`${BASE_URL}/announcements`);
  await expect(page.getByRole('heading', { name: 'Bottles4College' })).toBeVisible({ timeout: 5000 });

  await page.goto(`${BASE_URL}/map`);
  await expect(page.getByRole('heading', { name: 'Manoa Bin Map' })).toBeVisible({ timeout: 5000 });

  await page.goto(`${BASE_URL}/sorting-guide`);
  await expect(page.getByRole('heading', { name: 'Sorting Guide' })).toBeVisible({ timeout: 5000 });

  await page.goto(`${BASE_URL}/recycle-statistics`);
  await expect(page.getByRole('heading', { name: 'Recycling Impact Statistics' })).toBeVisible({ timeout: 5000 });
});

test('public nav shows sign in and sign up but not authenticated-only links', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible({ timeout: 5000 });
  await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible({ timeout: 5000 });
  await expect(page.getByRole('link', { name: 'Sign Out' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'My Profile' })).not.toBeVisible();
});

test('admin page redirects unauthenticated user to sign in', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin`);
  await expect(page).toHaveURL(/signin/, { timeout: 10000 });
});
