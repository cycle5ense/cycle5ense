import { test, expect } from './auth-utils';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

test.slow();

test('admin can access all pages', async ({ getUserPage }) => {
  const adminPage = await getUserPage('admin@admin.com', 'adm!n');

  await adminPage.goto(`${BASE_URL}/`);
  await expect(adminPage.getByRole('button', { name: 'admin@admin.com' })).toBeVisible({ timeout: 10000 });
  await expect(adminPage.getByRole('heading', { name: 'Cycle5ense' })).toBeVisible({ timeout: 5000 });

  await adminPage.goto(`${BASE_URL}/map`);
  await expect(adminPage.getByRole('heading', { name: 'Manoa Bin Map' })).toBeVisible({ timeout: 5000 });

  await adminPage.goto(`${BASE_URL}/add-pin`);
  await expect(adminPage.getByRole('heading', { name: 'Add Pin' })).toBeVisible({ timeout: 5000 });

  await adminPage.goto(`${BASE_URL}/edit-pins`);
  await expect(adminPage.getByRole('heading', { name: 'Edit Pins' })).toBeVisible({ timeout: 5000 });

  await adminPage.goto(`${BASE_URL}/admin`);
  await expect(adminPage.getByRole('heading', { name: 'List Users Admin' })).toBeVisible({ timeout: 5000 });
});

test('admin nav shows admin-specific links but not user or guest links', async ({ getUserPage }) => {
  const adminPage = await getUserPage('admin@admin.com', 'adm!n');

  await adminPage.goto(`${BASE_URL}/`);
  await adminPage.waitForLoadState('networkidle');

  await expect(adminPage.getByRole('link', { name: 'Admin' })).toBeVisible({ timeout: 5000 });
  await expect(adminPage.getByRole('link', { name: 'Add Pin' })).toBeVisible({ timeout: 5000 });
  await expect(adminPage.getByRole('link', { name: 'Edit Pins' })).toBeVisible({ timeout: 5000 });
  await expect(adminPage.getByRole('link', { name: 'Sign Out' })).toBeVisible({ timeout: 5000 });
  await expect(adminPage.getByRole('link', { name: 'My Profile' })).not.toBeVisible();
  await expect(adminPage.getByRole('link', { name: 'Sign In' })).not.toBeVisible();
  await expect(adminPage.getByRole('link', { name: 'Sign Up' })).not.toBeVisible();
});

test('admin can add, edit, and delete a pin', async ({ getUserPage }) => {
  const adminPage = await getUserPage('admin@admin.com', 'adm!n');
  const uniqueName = `Playwright Test Pin ${Date.now()}`;

  // Add a pin via the add-pin form
  await adminPage.goto(`${BASE_URL}/add-pin`);
  await expect(adminPage.getByRole('heading', { name: 'Add Pin' })).toBeVisible({ timeout: 5000 });

  await adminPage.getByLabel('Latitude').fill('21.2972');
  await adminPage.getByLabel('Longitude').fill('-157.8170');
  await adminPage.getByLabel('Building Name').fill(uniqueName);
  await adminPage.getByLabel('Location Description').fill('Playwright automated test pin');

  const [dialog] = await Promise.all([
    adminPage.waitForEvent('dialog'),
    adminPage.getByRole('button', { name: 'Save Pin' }).click(),
  ]);
  await dialog.accept();

  // Form should clear after successful save
  await expect(adminPage.getByLabel('Building Name')).toHaveValue('', { timeout: 5000 });

  // Navigate to edit-pins and edit the new pin
  await adminPage.goto(`${BASE_URL}/edit-pins`);
  await expect(adminPage.getByRole('heading', { name: 'Edit Pins' })).toBeVisible({ timeout: 5000 });

  const pinForm = adminPage.locator('form').filter({
    has: adminPage.locator(`input[name="name"][value="${uniqueName}"]`),
  });
  await expect(pinForm).toBeVisible({ timeout: 5000 });

  const editedName = `${uniqueName} (edited)`;
  await pinForm.getByLabel('Building Name').fill(editedName);
  await pinForm.getByRole('button', { name: 'Save' }).click();

  // Wait for page to update after server action, then verify the edit persisted
  await adminPage.waitForLoadState('networkidle');
  await adminPage.goto(`${BASE_URL}/edit-pins`);
  const editedPinForm = adminPage.locator('form').filter({
    has: adminPage.locator(`input[name="name"][value="${editedName}"]`),
  });
  await expect(editedPinForm).toBeVisible({ timeout: 5000 });

  // Delete the pin
  await editedPinForm.getByRole('button', { name: 'Remove Pin' }).click();

  // Wait for page to update and verify the pin is gone
  await adminPage.waitForLoadState('networkidle');
  await expect(adminPage.locator(`input[name="name"][value="${editedName}"]`)).not.toBeVisible({ timeout: 5000 });
});
