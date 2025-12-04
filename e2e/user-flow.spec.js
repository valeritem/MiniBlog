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

      const postCard = page.locator(".text-xl", {
        hasText: postData.title,
      });

      await expect(postCard).toBeVisible({ timeout: 15000 });
    });
    // --- 6. МОЇ ПОСТИ ---
    await test.step("6. Мої пости", async () => {
      await page.click("text=Мої пости");

      const myPost = page.locator(".text-xl", {
        hasText: postData.title,
      });

      await expect(myPost).toBeVisible({ timeout: 15000 });
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

      const titleInput = page.locator('[placeholder="Заголовок"]');
      await titleInput.clear();
      await titleInput.fill(postData.updatedTitle);

      const waitSave = page.waitForResponse(
        (res) =>
          res.url().includes("/posts") &&
          res.request().method() === "PUT" &&
          res.status() === 200
      );

      await page.click('button:has-text("Зберегти")');
      await waitSave;

      await page.reload({ waitUntil: "networkidle" });

      const updatedPost = page.getByTestId("post-item", {
        hasText: postData.updatedTitle,
      });

      await expect(updatedPost).toBeVisible({ timeout: 30000 });
    });

    // --- 9. ВИДАЛЕННЯ ---
    await test.step("9. Видалення", async () => {
      const updatedPost = page.getByTestId("post-item", {
        hasText: postData.updatedTitle,
      });

      await expect(updatedPost).toBeVisible({ timeout: 15000 });

      await updatedPost.click();

      page.once("dialog", (dialog) => dialog.accept());

      await page.getByTestId("delete-post").click();

      await expect(page).toHaveURL(/(\/|\/posts)$/);

      await expect(page.getByText(postData.updatedTitle)).toHaveCount(0);
    });
  });
});
