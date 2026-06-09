import { test, expect } from "@playwright/test";

test("användare kan se startsidan och gå till inloggning", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: /bygglov/i }).first()
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: /bygglovsrådgivning/i })
  ).toBeVisible();

  await page.getByRole("link", { name: /logga in/i }).first().click();

  await expect(page).toHaveURL(/\/inloggning/);
});