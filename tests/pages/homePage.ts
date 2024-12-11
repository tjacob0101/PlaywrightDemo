import {Page} from "@playwright/test";
import {clickOnButton} from "../utils/utils";

export class HomePage {
    url:string
    page:Page

    constructor(page:Page) {
        this.url = "https://hacktheicon.scramblerducati.com/"
        this.page = page
    }

    async navigateToHomePage() {
        await this.page.goto(this.url);
        await  this.page.waitForLoadState('load')
    }

    async acceptCookies() {
        await clickOnButton(this.page.locator('button:text("Accept All Cookies")'))
    }

    async clickOnStarToCreateBtn() {
        await clickOnButton(this.page.getByRole('link', { name: 'Start to create' }))
    }
}