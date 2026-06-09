import { test, expect } from "@playwright/test";

test("användare kan se startsidan och gå till inloggning", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Bygglov.se")).toBeVisible();
  await expect(page.getByText("Bygglovsrådgivning")).toBeVisible();

  await page.getByRole("link", { name: /logga in/i }).first().click();

  await expect(page).toHaveURL(/\/inloggning/);
});