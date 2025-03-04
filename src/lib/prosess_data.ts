import type { ArticleArray, dataArray, VideoArray } from '../../types/dataJson.js';

export const parseData = (dataTextArray: string[]): dataArray => dataTextArray.map((dataString) => JSON.parse(dataString))
export const getVideos = (dataJson: dataArray): VideoArray => dataJson.filter((data) => data.type === 'video')
export const getArticle = (dataJson: dataArray): ArticleArray => dataJson.filter((data) => data.type === 'article')
export const filterDuplicates = (DataJson: dataArray): dataArray => {
    const encounterdIdsSet: Set<string> = new Set()
    return DataJson.filter((data) => {
        if (encounterdIdsSet.has(data.id)) {
            return false
        } else {
            encounterdIdsSet.add(data.id)
            return true
        }
    })
}