import {expect, Page} from "@playwright/test";
import {clickOnButton} from "../utils/utils";

export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
}

export class PostPromptImageGenerationPage{
    url:string
    page:Page

    constructor(page:Page) {
        this.page = page;
        this.url = `https://hacktheicon.scramblerducati.com/create/*`
    }

    async waitForPageLoad(timeout:number) {
        await this.page.waitForURL(`${this.url}`,{timeout} )
    }

    async verifyNumberOfGeneratedImages(imageCount:number, timeout?:number) {
        const imageList = await this.page.locator('img[alt="generated image"]:visible')
        await expect(imageList).toHaveCount(imageCount,{timeout:timeout?timeout:60000});
    }

    async fillForm(params:UserData){
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(params.firstName)
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(params.lastName)
        await this.page.getByRole('textbox', { name: 'Email' }).fill(params.email)
        await this.page.getByRole('combobox', { name: 'Select Country' }).click()
        await this.page.getByLabel(params.country).click();
    }

    async acceptTermsInForm(){
        await clickOnButton(this.page.getByLabel('for marketing activities via'))
        await clickOnButton(this.page.getByLabel('to understand your'))
    }

    async clickFormSubmitButton(){
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async selectImage(){
        await this.page.getByRole('button', { name: 'generated image' }).first().click();
    }

    async clickNextButtonAfterImageSelect(){
        await this.page.getByRole('button', { name: 'Next' }).click();
    }
}