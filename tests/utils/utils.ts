import {expect, Locator, Page} from "@playwright/test";
import sharp from "sharp";

export async function clickOnButton(button:Locator, force?: boolean): Promise<void> {
    await button.waitFor({ state: 'visible', timeout: 10000 });
    const isVisible = await button.isVisible()

    if (isVisible) {
        await button.click({force:force});
    } else
    {
        console.log('button not clicked')
    }
}


export async function downloadByButtonClick(page:Page,buttonName: string,downloadPath:string){
    const [download] = await Promise.all([
        page.waitForEvent('download'),  // Wait for the download event
        await page.getByRole('button', { name: `${buttonName}` }).click()
    ]);

    await download.saveAs(downloadPath);
}

export async function checkImageResolution({downloadPath, width, height}:{downloadPath:string, width:number, height:number} ):Promise<void>{
    try{
        const metadata = await sharp(downloadPath).metadata();
        console.log(`Image resolution: ${metadata.width}x${metadata.height}`);
        expect(metadata.width).toBe(width);
        expect(metadata.height).toBe(height);
    } catch (error) {
        console.error('Error reading image metadata:', error);
    }
}

export function uniqueDateTimeID(){
    const dateTimeString = new Date().toISOString();
    return dateTimeString.replace(/[^0-9]/g, '')
}