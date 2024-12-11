import {checkImageResolution, downloadByButtonClick} from "../utils/utils";
import {Page} from "@playwright/test";

export class DownloadImagePage {
    downloadPath:string
    page:Page

    constructor(page:Page) {
        this.downloadPath = `./downloads`;
        this.page = page;
    }

    async downloadImage(fileName:string){
        await downloadByButtonClick(this.page,'DOWNLOAD', `${this.downloadPath}/${fileName}`)
    }

    async checkDownloadedImageResolution({height,width,fileName}:{height:number;width:number;fileName:string}) {
        await checkImageResolution({height, width, downloadPath:`${this.downloadPath}/${fileName}`})
    }
}