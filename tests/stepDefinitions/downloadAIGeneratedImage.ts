import {AfterAll, BeforeAll, Given, Then, When,setDefaultTimeout} from "@cucumber/cucumber";
import { expect, Page} from '@playwright/test';
import {Browser, chromium} from "playwright";
import {uniqueDateTimeID} from "../utils/utils";
import {HomePage} from "../pages/homePage";
import {CreateCustomDucatiScramblePage} from "../pages/createCustomDucatiScramblePage";
import {PostPromptImageGenerationPage, UserData} from "../pages/postPromptImageGenerationPage";
import {DownloadImagePage} from "../pages/downloadImagePage";

let browser: Browser
let page: Page;
let homePage: HomePage;
let createCustomDucatiScramblePage: CreateCustomDucatiScramblePage;
let postPromptGenerationPage:PostPromptImageGenerationPage
let downloadImagePage:DownloadImagePage
setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
    browser = await chromium.launch({headless: false});
    page = await browser.newPage();
    homePage = new HomePage(page)
    createCustomDucatiScramblePage = new CreateCustomDucatiScramblePage(page)
    postPromptGenerationPage = new PostPromptImageGenerationPage(page)
    downloadImagePage = new DownloadImagePage(page)
})

AfterAll(async () => {
   await page.close();
   await browser.close()
})

Given('I am on the Ducati Scrambler website', async ()=> {
    await homePage.navigateToHomePage()
    await homePage.acceptCookies()
});

When(/^I click “Start to Create”$/, async ()=> {
    await homePage.clickOnStarToCreateBtn()
    await createCustomDucatiScramblePage.verifyPageTitle()

});

Then(/^I should see the “Create Your Custom Scrambler Ducati” page$/, async ()=> {
    await createCustomDucatiScramblePage.verifyPageHeading()
});

Given(/^I am on the image creation page$/, async ()=> {
    await createCustomDucatiScramblePage.verifyPageUrl()
});

When(/^I fill in the prompt and click “Generate”$/, async ()=> {
    await createCustomDucatiScramblePage.fillPromptWithText("Generate 4 images")
    await createCustomDucatiScramblePage.clickOnGenerateButton()

});

When(/^I wait for the generation process to complete$/, async ()=> {
    await postPromptGenerationPage.waitForPageLoad(70000)
});

Then(/^I should see the (\d+) generated images$/, async(imageCount:number) => {
    await postPromptGenerationPage.verifyNumberOfGeneratedImages(imageCount)
});

Given(/^the (\d+) images have been generated and are visible$/, async (imageCount:number)=> {
    await postPromptGenerationPage.verifyNumberOfGeneratedImages(imageCount)
});

When(/^I fill in my details and accept the terms$/, async (datatable)=> {
    expect(datatable.hashes().length).toBe(1)
    const user = datatable.hashes()[0] as UserData
    await postPromptGenerationPage.fillForm({country: user.country, email: user.email, firstName: user.firstName, lastName: user.lastName})
    await postPromptGenerationPage.acceptTermsInForm()
});

When(/^I click “Submit”$/, async ()=> {
    await postPromptGenerationPage.clickFormSubmitButton()
});

Then(/^I should be able to choose one of the (\d+) images$/, async (args:number)=> {
    await postPromptGenerationPage.selectImage()
    await postPromptGenerationPage.clickNextButtonAfterImageSelect()
});

Then(/^the resolution of the saved file should be (\d+) x (\d+)$/, async (width:number, height:number)=> {
    const fileName = uniqueDateTimeID()
    await downloadImagePage.downloadImage(fileName)
    await downloadImagePage.checkDownloadedImageResolution({height,width,fileName})
});