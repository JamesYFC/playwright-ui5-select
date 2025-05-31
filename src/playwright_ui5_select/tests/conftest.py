from playwright.sync_api import BrowserContext, Playwright
from playwright_ui5_select import css, xpath
from pytest import fixture


@fixture(scope="session", autouse=True)
def _(playwright: Playwright):
    # register selector engines
    playwright.selectors.register(
        "ui5_css",
        css,
    )
    playwright.selectors.register(
        "ui5_xpath",
        xpath,
    )


@fixture(scope="function", autouse=True)
def __(context: BrowserContext):
    # add cookies to avoid consent pop-up
    context.add_cookies(
        [
            {
                "name": "dk_allow_required_cookies",
                "value": "0",
                "domain": "ui5.sap.com",
                "path": "/",
            },
            {
                "name": "dk_approval_requested",
                "value": "1",
                "domain": "ui5.sap.com",
                "path": "/",
            },
            {
                "name": "notice_gdpr_prefs",
                "value": "0::implied,eu",
                "domain": "ui5.sap.com",
                "path": "/",
            },
            {
                "name": "notice_preferences",
                "value": "0:",
                "domain": "ui5.sap.com",
                "path": "/",
            },
        ]
    )
