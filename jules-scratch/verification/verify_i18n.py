import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        # 1. Navigate to the homepage
        page.goto("http://localhost:5173")

        # 2. Wait for the page to load and take a screenshot in English
        expect(page.get_by_role("heading", name="Welcome to .TECH")).to_be_visible(timeout=10000)
        page.screenshot(path="jules-scratch/verification/verification_en.png")

        # 3. Switch to Traditional Chinese
        chinese_button = page.get_by_role("button", name="正體中文")
        chinese_button.click()

        # 4. Wait for the translation to apply and take a screenshot
        expect(page.get_by_role("heading", name="歡迎來到 .TECH")).to_be_visible(timeout=10000)
        page.screenshot(path="jules-scratch/verification/verification_zh_hant.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)