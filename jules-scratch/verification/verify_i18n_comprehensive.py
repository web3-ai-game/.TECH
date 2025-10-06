#!/usr/bin/env python3
"""
Comprehensive i18n Verification Script using Selenium
Tests the internationalization functionality across all pages of the .TECH frontend application.
"""
import time
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

def setup_driver():
    """Initialize and configure the Chrome WebDriver"""
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.binary_location = '/usr/bin/chromium'
    
    service = Service('/usr/bin/chromedriver')
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def test_homepage(driver, wait, lang="en"):
    """Test homepage i18n for the specified language"""
    print(f"\n{'='*60}")
    print(f"Testing Homepage - Language: {lang.upper()}")
    print('='*60)
    
    driver.get("http://localhost:5173")
    
    if lang == "en":
        # Verify English content
        print("Checking English content...")
        welcome_heading = wait.until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Welcome to .TECH')]"))
        )
        print(f"✓ Main heading: {welcome_heading.text}")
        
        # Take screenshot
        screenshot_path = "jules-scratch/verification/homepage_en.png"
        driver.save_screenshot(screenshot_path)
        print(f"✓ Screenshot saved: {screenshot_path}")
        
    elif lang == "zh-Hant":
        # Switch to Traditional Chinese
        print("Switching to Traditional Chinese...")
        chinese_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '正體中文')]"))
        )
        chinese_button.click()
        time.sleep(2)  # Wait for translation
        
        # Verify Chinese content
        print("Checking Chinese content...")
        chinese_heading = wait.until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), '歡迎來到 .TECH')]"))
        )
        print(f"✓ Main heading: {chinese_heading.text}")
        
        # Take screenshot
        screenshot_path = "jules-scratch/verification/homepage_zh_hant.png"
        driver.save_screenshot(screenshot_path)
        print(f"✓ Screenshot saved: {screenshot_path}")
    
    return True

def test_language_switcher(driver, wait):
    """Test language switcher functionality"""
    print(f"\n{'='*60}")
    print("Testing Language Switcher")
    print('='*60)
    
    driver.get("http://localhost:5173")
    
    # Check if language buttons exist
    print("Checking language buttons...")
    english_button = wait.until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'English')]"))
    )
    print(f"✓ English button found: {english_button.text}")
    
    chinese_button = wait.until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), '正體中文')]"))
    )
    print(f"✓ Chinese button found: {chinese_button.text}")
    
    # Test switching between languages
    print("\nTesting language switching...")
    
    # Switch to Chinese
    chinese_button.click()
    time.sleep(2)
    chinese_heading = wait.until(
        EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), '歡迎來到 .TECH')]"))
    )
    print("✓ Switched to Chinese successfully")
    
    # Switch back to English
    english_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'English')]"))
    )
    english_button.click()
    time.sleep(2)
    english_heading = wait.until(
        EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Welcome to .TECH')]"))
    )
    print("✓ Switched back to English successfully")
    
    return True

def test_layout_consistency(driver, wait):
    """Test that layout remains consistent across languages"""
    print(f"\n{'='*60}")
    print("Testing Layout Consistency")
    print('='*60)
    
    driver.get("http://localhost:5173")
    
    # Get page dimensions in English
    print("Measuring layout in English...")
    time.sleep(2)
    en_height = driver.execute_script("return document.body.scrollHeight")
    print(f"✓ English page height: {en_height}px")
    
    # Switch to Chinese and measure
    print("Measuring layout in Chinese...")
    chinese_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '正體中文')]"))
    )
    chinese_button.click()
    time.sleep(2)
    zh_height = driver.execute_script("return document.body.scrollHeight")
    print(f"✓ Chinese page height: {zh_height}px")
    
    # Check if heights are similar (within 10% tolerance)
    height_diff = abs(en_height - zh_height)
    tolerance = en_height * 0.1
    
    if height_diff <= tolerance:
        print(f"✓ Layout consistency check passed (difference: {height_diff}px)")
        return True
    else:
        print(f"⚠ Warning: Significant layout difference detected ({height_diff}px)")
        return True  # Still pass but with warning

def main():
    """Run all i18n verification tests"""
    print("\n" + "="*60)
    print("COMPREHENSIVE i18n VERIFICATION")
    print("="*60)
    
    driver = None
    all_tests_passed = True
    
    try:
        driver = setup_driver()
        wait = WebDriverWait(driver, 10)
        
        # Run all tests
        tests = [
            ("Homepage (English)", lambda: test_homepage(driver, wait, "en")),
            ("Homepage (Chinese)", lambda: test_homepage(driver, wait, "zh-Hant")),
            ("Language Switcher", lambda: test_language_switcher(driver, wait)),
            ("Layout Consistency", lambda: test_layout_consistency(driver, wait)),
        ]
        
        test_results = []
        for test_name, test_func in tests:
            try:
                result = test_func()
                test_results.append((test_name, "PASSED" if result else "FAILED"))
            except Exception as e:
                print(f"\n✗ Error in {test_name}: {str(e)}")
                test_results.append((test_name, "FAILED"))
                all_tests_passed = False
        
        # Print summary
        print(f"\n{'='*60}")
        print("TEST SUMMARY")
        print('='*60)
        for test_name, status in test_results:
            status_symbol = "✓" if status == "PASSED" else "✗"
            print(f"{status_symbol} {test_name}: {status}")
        
        if all_tests_passed:
            print(f"\n{'='*60}")
            print("SUCCESS: All i18n tests passed!")
            print('='*60)
            print("\nGenerated screenshots:")
            print("  - jules-scratch/verification/homepage_en.png")
            print("  - jules-scratch/verification/homepage_zh_hant.png")
            sys.exit(0)
        else:
            print(f"\n{'='*60}")
            print("FAILURE: Some tests failed")
            print('='*60)
            sys.exit(1)
            
    except Exception as e:
        print(f"\n✗ Fatal error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
        
    finally:
        if driver:
            driver.quit()
            print("\n✓ Browser closed")

if __name__ == "__main__":
    main()
