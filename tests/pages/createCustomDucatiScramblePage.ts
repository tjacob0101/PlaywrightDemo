import {expect, Page} from "@playwright/test";
import {clickOnButton} from "../utils/utils";

export class CreateCustomDucatiScramblePage {
    url: string
    page:Page

    constructor(page:Page) {
        this.page = page
        this.url = 'https://hacktheicon.scramblerducati.com/create'
    }

    async verifyPageUrl() {
        const url = this.page.url()
        expect(url).toEqual('https://hacktheicon.scramblerducati.com/create');
    }

    async verifyPageTitle() {
        await expect(this.page).toHaveTitle(/Create your custom Scrambler Ducati with AI/);
    }

    async verifyPageHeading(){
        await expect(this.page.getByRole('heading', {name: 'CREATE YOUR CUSTOM SCRAMBLER'})).toBeVisible();
    }

    async fillPromptWithText(enterText: string) {
        const textArea =  await this.page.waitForSelector('textArea[name="prompt"]', { state: 'visible' });
        await textArea.fill(enterText);
    }

    async clickOnGenerateButton(){
        await clickOnButton(this.page.getByRole('button', { name: 'Generate', exact: true  }), true);
    }



}