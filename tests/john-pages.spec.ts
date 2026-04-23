import { test, expect } from './auth-utils';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

test.slow();

test('user can access public pages and their profile page', async ({ getUserPage }) => {
  const userPage = await getUserPage('john@foo.com', 'changeme');

  await userPage.goto(`${BASE_URL}/`);
  await expect(userPage.getByRole('button', { name: 'john@foo.com' })).toBeVisible({ timeout: 10000 });
  await expect(userPage.getByRole('heading', { name: 'Cycle5ense' })).toBeVisible({ timeout: 5000 });

  await userPage.goto(`${BASE_URL}/map`);
  await expect(userPage.getByRole('heading', { name: 'Manoa Bin Map' })).toBeVisible({ timeout: 5000 });

  await userPage.goto(`${BASE_URL}/sorting-guide`);
  await expect(userPage.getByRole('heading', { name: 'Sorting Guide' })).toBeVisible({ timeout: 5000 });

  await userPage.goto(`${BASE_URL}/user`);
  await expect(userPage.getByText('Test')).toBeVisible({ timeout: 5000 });
});

test('user nav shows My Profile and Sign Out but not admin links', async ({ getUserPage }) => {
  const userPage = await getUserPage('john@foo.com', 'changeme');

  await userPage.goto(`${BASE_URL}/`);
  await userPage.waitForLoadState('networkidle');

  await expect(userPage.getByRole('link', { name: 'My Profile' })).toBeVisible({ timeout: 5000 });
  await expect(userPage.getByRole('link', { name: 'Sign Out' })).toBeVisible({ timeout: 5000 });
  await expect(userPage.getByRole('link', { name: 'Admin' })).not.toBeVisible();
  await expect(userPage.getByRole('link', { name: 'Add Pin' })).not.toBeVisible();
  await expect(userPage.getByRole('link', { name: 'Edit Pins' })).not.toBeVisible();
  await expect(userPage.getByRole('link', { name: 'Sign In' })).not.toBeVisible();
});

test('user is redirected to not-authorized when accessing admin page', async ({ getUserPage }) => {
  const userPage = await getUserPage('john@foo.com', 'changeme');

  await userPage.goto(`${BASE_URL}/admin`);
  await expect(userPage.getByText('Not Authorized')).toBeVisible({ timeout: 10000 });
});
