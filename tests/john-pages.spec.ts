import { test, expect } from './auth-utils';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

test.slow();

test('user can access public pages and their profile page', async ({ getUserPage }) => {
  const userPage = await getUserPage('john@foo.com', 'changeme');

  await userPage.goto(`${BASE_URL}/`);
  await expect(userPage.locator('.pill-nav-items a[href="/auth/signout"]')).toBeAttached({ timeout: 10000 });
  await expect(userPage.getByRole('heading', { name: 'Cycle5ense', exact: true })).toBeVisible({ timeout: 5000 });

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

  await expect(userPage.locator('.pill-nav-items a[href="/user"]')).toBeAttached({ timeout: 5000 });
  await expect(userPage.locator('.pill-nav-items a[href="/auth/signout"]')).toBeAttached({ timeout: 5000 });
  await expect(userPage.locator('.pill-nav-items a[href="/admin"]')).not.toBeAttached();
  await expect(userPage.locator('.pill-nav-items a[href="/add-pin"]')).not.toBeAttached();
  await expect(userPage.locator('.pill-nav-items a[href="/edit-pins"]')).not.toBeAttached();
  await expect(userPage.locator('.pill-nav-items a[href="/auth/signin"]')).not.toBeAttached();
});

test('user is redirected to not-authorized when accessing admin page', async ({ getUserPage }) => {
  const userPage = await getUserPage('john@foo.com', 'changeme');

  await userPage.goto(`${BASE_URL}/admin`);
  await expect(userPage.getByText('Not Authorized')).toBeVisible({ timeout: 10000 });
});

test('user can update their profile name', async ({ getUserPage }) => {
  const userPage = await getUserPage('john@foo.com', 'changeme');

  await userPage.goto(`${BASE_URL}/user`);
  await userPage.waitForLoadState('networkidle');

  await userPage.getByLabel('First Name').fill('Test');
  await userPage.getByLabel('Last Name').fill('Tester');
  await userPage.getByRole('button', { name: 'Save Profile' }).click();

  await userPage.waitForLoadState('networkidle');
  await expect(userPage.getByRole('heading', { name: 'Hello, Test Tester' })).toBeVisible({ timeout: 5000 });
  await expect(userPage.getByText('Last Name:').locator('..').getByText('Tester')).toBeVisible({ timeout: 5000 });
});

test('user can add a recycling entry', async ({ getUserPage }) => {
  const userPage = await getUserPage('john@foo.com', 'changeme');

  await userPage.goto(`${BASE_URL}/user`);
  await userPage.waitForLoadState('networkidle');

  const totalText = await userPage.locator('.display-6').textContent({ timeout: 5000 });
  const totalBefore = parseInt((totalText ?? '0').replace(/,/g, ''), 10);

  await userPage.getByLabel('Number of Items Recycled').fill('5');
  await userPage.getByRole('button', { name: 'Add Recycling Entry' }).click();

  await userPage.waitForLoadState('networkidle');

  await expect(userPage.locator('.display-6')).toHaveText(String(totalBefore + 5), { timeout: 5000 });
  await expect(userPage.getByRole('cell', { name: '5', exact: true }).first()).toBeVisible({ timeout: 5000 });
});
