import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

        path = "file://" + os.path.abspath("index.html")
        await page.goto(path)

        # Check if crypto.subtle is available
        is_secure = await page.evaluate("() => !!(window.crypto && crypto.subtle)")
        print(f"Crypto Subtle available: {is_secure}")

        # Try to login
        await page.fill("#pw-input", "JohnHub2026")
        await page.click("button.login-btn")

        # Wait a bit for async hash
        await asyncio.sleep(1)

        is_app_visible = await page.is_visible("#app")
        print(f"App visible after login: {is_app_visible}")

        if not is_app_visible:
            err_text = await page.inner_text("#pw-err")
            print(f"Error text: {err_text}")
            # Take screenshot for debugging
            await page.screenshot(path="debug_login.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
