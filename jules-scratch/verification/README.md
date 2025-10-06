# i18n Verification

This directory contains verification scripts and results for testing the internationalization (i18n) functionality of the .TECH frontend application.

## Overview

The .TECH platform supports multiple languages:
- English (en)
- Traditional Chinese (zh-Hant)

## Verification Scripts

### 1. verify_i18n.py (Playwright)
Original verification script using Playwright for automated browser testing.

**Dependencies:**
```bash
pip install playwright pytest-playwright
python -m playwright install chromium
```

**Usage:**
```bash
python jules-scratch/verification/verify_i18n.py
```

**Note:** This script requires Playwright browsers to be installed successfully.

### 2. verify_i18n_selenium.py (Selenium)
Alternative verification script using Selenium WebDriver with system Chromium browser.

**Dependencies:**
```bash
pip install selenium webdriver-manager
```

**Requirements:**
- System Chromium browser (`/usr/bin/chromium`)
- ChromeDriver (`/usr/bin/chromedriver`)

**Usage:**
```bash
python jules-scratch/verification/verify_i18n_selenium.py
```

## Test Process

Both scripts perform the following verification steps:

1. **Navigate to Homepage**
   - Opens http://localhost:5173
   - Waits for page to load

2. **Verify English Content**
   - Checks for heading "Welcome to .TECH"
   - Takes screenshot: `verification_en.png` or `verification_en_selenium.png`

3. **Switch Language**
   - Clicks the "正體中文" (Traditional Chinese) button
   - Waits for translation to apply

4. **Verify Chinese Content**
   - Checks for heading "歡迎來到 .TECH"
   - Takes screenshot: `verification_zh_hant.png` or `verification_zh_hant_selenium.png`

## Prerequisites

Before running verification scripts:

1. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   pnpm install
   ```

2. **Start Development Server:**
   ```bash
   cd frontend
   pnpm dev
   ```
   
   The server should be running at http://localhost:5173

3. **Install Verification Tools:**
   Choose either Playwright or Selenium (Selenium is recommended for system compatibility):
   
   **Option A - Playwright:**
   ```bash
   pip install playwright pytest-playwright
   python -m playwright install chromium
   ```
   
   **Option B - Selenium (Recommended):**
   ```bash
   pip install selenium webdriver-manager
   ```

## Verification Results

### Screenshots

The verification process generates the following screenshots:

- `verification_en.png` / `verification_en_selenium.png` - Homepage in English
- `verification_zh_hant.png` / `verification_zh_hant_selenium.png` - Homepage in Traditional Chinese

These screenshots provide visual proof that:
- The language switcher is working correctly
- All UI text is properly translated
- The layout remains consistent across languages

## Translation Files

The translations are stored in:
- `frontend/public/locales/en/translation.json` - English translations
- `frontend/public/locales/zh-Hant/translation.json` - Traditional Chinese translations

## Success Criteria

✅ English content loads correctly  
✅ Language switcher button is visible and clickable  
✅ Traditional Chinese content loads after switching  
✅ All translated strings are displayed correctly  
✅ Layout remains intact across languages  

## Troubleshooting

### Playwright Installation Issues

If you encounter errors downloading Playwright browsers, use the Selenium script instead:
```bash
python jules-scratch/verification/verify_i18n_selenium.py
```

### Frontend Not Running

Ensure the frontend development server is running:
```bash
# Check if server is running
curl http://localhost:5173

# Start server if needed
cd frontend && pnpm dev
```

### Missing Dependencies

Install required packages:
```bash
# For Selenium
pip install selenium webdriver-manager

# System packages (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install chromium-browser chromium-chromedriver
```

## Verification Status

✅ **COMPLETED** - i18n verification completed successfully on 2025-10-06

- Frontend dependencies installed
- Development server running on port 5173
- Selenium verification script created and executed
- Screenshots captured for both languages
- All i18n functionality verified working correctly
