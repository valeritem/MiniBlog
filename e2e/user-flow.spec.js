import { test, expect } from "@playwright/test";
import path from "path";

test.describe("Повний цикл роботи системи (E2E)", () => {
  const randomId = Date.now();

  const userData = {
    username: `user_${randomId}`,
    password: "password123",
  };

  const postData = {
    title: `Тестовий Пост ${randomId}`,
    text: "Це контент посту, створений автоматичним тестом Playwright.",
    updatedTitle: `Оновлений Пост ${randomId}`,
    comment: "Це тестовий коментар!",
  };

  test("Реєстрація -> Логін -> Постинг", async ({ page }) => {
    // --- 1. РЕЄСТРАЦІЯ ---
    await test.step("1. Реєстрація", async () => {
      await page.goto("/register");

      await expect(page.locator('[placeholder="Username"]')).toBeVisible();

      const responsePromise = page.waitForResponse(
        (res) =>
          res.url().includes("/api/auth/register") &&
          (res.status() === 200 || res.status() === 201)
      );

      await page.fill('[placeholder="Username"]', userData.username);
      await page.fill('[placeholder="Password"]', userData.password);

      await page.getByRole("button", { name: "Підтвердити" }).click();

      await responsePromise;

      await expect(page).toHaveURL("/", { timeout: 10000 });

      await expect(page.locator("text=Додати пост")).toBeVisible({
        timeout: 10000,
      });
    });

    // --- 2. ВИХІД ---
    await test.step("2. Вихід", async () => {
      await page.click('button:has-text("Вийти")');
      await expect(page).toHaveURL("/");
    });

    // --- 3. ЛОГІН ---
    await test.step("3. Логін", async () => {
      await page.click("text=Увійти");
      await expect(page).toHaveURL("/login");

      await page.fill('[placeholder="Username"]', userData.username);
      await page.fill('[placeholder="Password"]', userData.password);
      await page.click('button:has-text("Увійти")');

      await expect(page).toHaveURL("/");
    });

    // --- 4. СТВОРЕННЯ ПОСТА ---
    await test.step("4. Створення поста", async () => {
      await page.click("text=Додати пост");
      await expect(page).toHaveURL("/new");

      await page.fill('[placeholder="Заголовок"]', postData.title);
      await page.fill("textarea", postData.text);

      await page
        .setInputFiles(
          'input[type="file"]',
          path.join(__dirname, "test-image.jpg")
        )
        .catch(() => {});

      await page.click('button:has-text("Додати")');
      await expect(page).toHaveURL("/");
    });

    // --- 5. ПЕРЕВІРКА НА ГОЛОВНІЙ ---
    await test.step("5. Пост відображається на головній", async () => {
      await page.reload();
      await page.waitForLoadState("networkidle");

      const postCard = page.locator(".text-xl", { hasText: postData.title });
      await expect(postCard).toBeVisible();
    });

    // --- 6. МОЇ ПОСТИ ---
    await test.step("6. Мої пости", async () => {
      await page.click("text=Мої пости");
      await page.waitForLoadState("networkidle");
      await expect(
        page.locator(".text-xl", { hasText: postData.title })
      ).toBeVisible();
    });

    // --- 7. КОМЕНТАР ---
    await test.step("7. Коментар", async () => {
      await page.click(`.text-xl:has-text("${postData.title}")`);

      await expect(page).toHaveURL(/[a-f0-9]{24}$/);

      await page.fill('[placeholder="Comment"]', postData.comment);
      await page.click('button:has-text("Надіслати")');

      await expect(page.locator(`text=${postData.comment}`)).toBeVisible();
    });

    // --- 8. РЕДАГУВАННЯ ---
    await test.step("8. Редагування", async () => {
      await page.click('a[href*="edit"]');

      await expect(page).toHaveURL(/edit/);

      await page.fill('[placeholder="Заголовок"]', postData.updatedTitle);

      const waitSave = page.waitForResponse(
        (res) => res.url().includes("/posts") && res.status() === 200
      );

      await page.click("text=Зберегти");
      await waitSave;

      await expect(page).not.toHaveURL(/edit/);

      await page.click("text=Мої пости");
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL(/\/posts/);

      await expect(
        page.locator(".text-xl", { hasText: postData.updatedTitle })
      ).toBeVisible({ timeout: 10000 });
    });

    // --- 9. ВИДАЛЕННЯ ---
    await test.step("9. Видалення", async () => {
      await page.click(`.text-xl:has-text("${postData.updatedTitle}")`);

      page.on("dialog", (dialog) => dialog.accept());

      await page.locator("button:has(svg)").last().click();
      await expect(page).toHaveURL(/(\/|\/posts)$/);

      await expect(
        page.locator(`text=${postData.updatedTitle}`)
      ).not.toBeVisible();
    });
  });
});
