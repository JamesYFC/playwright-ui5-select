from playwright.sync_api import Page


def test_basic(page: Page):
    page.goto("https://ui5.sap.com")
    page.click("ui5_css=sap.m.Button[text='Get Started with UI5']")
