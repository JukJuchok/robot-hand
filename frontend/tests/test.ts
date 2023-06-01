import { expect, test } from '@playwright/test';

test('index page has connect button', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Подключиться к манипулятору' })).toBeVisible();
});
