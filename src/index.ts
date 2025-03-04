import { argv } from 'node:process';
import { getData } from './lib/access_db.ts';
import { getArticle, getVideos, parseData, filterDuplicates } from './lib/prosess_data.ts';

type test = boolean;

export const isTest = (isTest: test): string => {
    if (isTest) {
        return 'is test';
    } else {
        const stringData = getData()
        const jsonData = filterDuplicates(parseData(stringData))
        const videos = getVideos(jsonData)
        const articles = getArticle(jsonData)

        console.log({videos: videos.length, articles: articles.length})
        return 'not implemented';
    }
};

let ranIsTest: boolean = false
let passedNodeArgs: boolean = false
let res: string
argv
    .filter((val: string) => {
        if (passedNodeArgs) {
            return true
        } else if (val === '--') {
            passedNodeArgs = true
        }

        return false
    })
    .forEach((val: string, index) => {
        if (val === ('test')) {
            res = isTest(true);
            ranIsTest = true;
        } else {
            console.error(`value nr. ${index}: ${val} is not an recognised argument`)
        }
    })

if (!ranIsTest) {
    res = isTest(false)
};

console.log(res)