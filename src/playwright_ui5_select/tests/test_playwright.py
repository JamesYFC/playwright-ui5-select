from playwright.sync_api import Page


def test_basic_css(page: Page):
    page.goto("https://ui5.sap.com")
    page.click("ui5_css=sap.m.Button[text='Get Started with UI5']")


def test_basic_xpath(page: Page):
    page.goto("https://ui5.sap.com")
    page.click(
        "ui5_xpath=//sap.m.Button[ui5:property(., 'text')='Get Started with UI5']"
    )
