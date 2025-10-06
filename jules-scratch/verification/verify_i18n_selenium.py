#!/usr/bin/env python3
"""
i18n Verification Script using Selenium
Tests the internationalization functionality of the .TECH frontend application.
"""
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

def main():
    # Configure Chrome options for headless mode
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    
    # Use system chromium
    chrome_options.binary_location = '/usr/bin/chromium'
    
    # Create service with system chromedriver
    service = Service('/usr/bin/chromedriver')
    
    try:
        # Initialize the Chrome driver
        driver = webdriver.Chrome(service=service, options=chrome_options)
        wait = WebDriverWait(driver, 10)
        
        try:
            print("Step 1: Navigating to the homepage...")
            driver.get("http://localhost:5173")
            
            print("Step 2: Waiting for English content to load...")
            # Wait for the main heading to be visible
            welcome_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Welcome to .TECH')]"))
            )
            print(f"✓ Found English heading: {welcome_heading.text}")
            
            # Take screenshot in English
            print("Step 3: Taking screenshot in English...")
            driver.save_screenshot("jules-scratch/verification/verification_en_selenium.png")
            print("✓ English screenshot saved")
            
            print("Step 4: Switching to Traditional Chinese...")
            # Find and click the Chinese language button
            chinese_button = wait.until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '正體中文')]"))
            )
            chinese_button.click()
            print("✓ Clicked Chinese language button")
            
            # Wait a moment for the translation to apply
            time.sleep(2)
            
            print("Step 5: Waiting for Chinese content to load...")
            # Wait for the translated heading
            chinese_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), '歡迎來到 .TECH')]"))
            )
            print(f"✓ Found Chinese heading: {chinese_heading.text}")
            
            # Take screenshot in Chinese
            print("Step 6: Taking screenshot in Traditional Chinese...")
            driver.save_screenshot("jules-scratch/verification/verification_zh_hant_selenium.png")
            print("✓ Chinese screenshot saved")
            
            print("\n" + "="*50)
            print("SUCCESS: i18n verification completed!")
            print("="*50)
            print("Screenshots saved:")
            print("  - jules-scratch/verification/verification_en_selenium.png")
            print("  - jules-scratch/verification/verification_zh_hant_selenium.png")
            
        finally:
            driver.quit()
            print("\n✓ Browser closed")
            
    except Exception as e:
        print(f"\n✗ Error occurred: {str(e)}")
        raise

if __name__ == "__main__":
    main()
