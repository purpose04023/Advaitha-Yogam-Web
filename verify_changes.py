import re
from playwright.sync_api import sync_playwright, expect

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the home page
        page.goto("http://localhost:5179")

        # Verify branding
        expect(page).to_have_title(re.compile("Advaitha Yogam"))

        # Take a screenshot of the Hero section with the new background
        page.set_viewport_size({"width": 1280, "height": 800})
        page.screenshot(path="verification_home.png")

        # Open language menu and take a screenshot
        page.click("button:has(svg.lucide-globe)")
        page.wait_for_selector("button:has-text('తెలుగు')")
        page.screenshot(path="verification_languages.png")

        # Navigate to login page
        page.goto("http://localhost:5179/login")
        page.wait_for_selector("input[type='email']")
        page.screenshot(path="verification_login.png")

        # Try manual login with admin fallback
        page.fill("input[type='email']", "subbu.eenadu@gmail.com")
        page.fill("input[type='password']", "Advaitha@2025")
        page.click("button[type='submit']")

        # Wait for redirection to home
        page.wait_for_url("http://localhost:5179/")

        # Check if Admin link is visible
        expect(page.locator("a:has-text('Admin')")).to_be_visible()
        page.screenshot(path="verification_admin_access.png")

        browser.close()

if __name__ == "__main__":
    verify_site()
