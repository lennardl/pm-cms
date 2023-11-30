// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:80/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PM CMS Training/);
});

test('Test Add buttom on homepage', async ({ page }) => {
  await page.goto('http://localhost:80/');

  // Click the Add button
  await page.getByLabel('AddCustomer').click();

  // Expects page to have a heading with the name of Add Customer.
  expect(page.url()).toContain('add');
});

// test('Test Add New Customer', async ({ page }) => {
//   await page.goto('http://localhost:80/add');

//   // Pre-fill form
//   await page.getByPlaceholder('First Name').fill('Peter');
//   await page.getByPlaceholder('Last Name').fill('Thiel');
//   await page.getByPlaceholder('Telephone').fill('999');
//   await page.getByPlaceholder('Email').fill('Peter@me.com');
//   await page.getByPlaceholder('Customer Details').fill('Auto-run by test script');

//   // Click Add
//   await page.getByLabel('AddCustomer').click();

//   // Expects page to have a heading with the name of Add Customer.
//   await expect(page.locator('tr')).toContainText(['Peter@me.com']);
// });