export type Style = {
    sizes: {
        teaser: {
            height: number,
            width: number,
            margin: number,
            padding: number,
            font_size: number,
        },
        open: {
            height: number,
            width: number,
            margin: number,
            padding: number,
            font_size: number,
        }
    },
    colors: {
        backgound_color: string,
        forground_color: string
    }
}

export type Content = {
    img: String,
    imgAlt_text: string,
    title_text: string,
    leadin_text: string,
    body: {
        video: Array<string> | null,
        sub_title_text: string | null,
        text: Array<string> | null
    }
}

export type VideoContent = {
    img: String,
    imgAlt_text: string,
    title_text: string,
    leadin_text: string,
    body: {
        video: Array<string>
        sub_title_text: string
        text: null
    }
}
export type ArticleContent = {
    img: String,
    imgAlt_text: string,
    title_text: string,
    leadin_text: string,
    body: {
        video: null
        sub_title_text: null,
        text: Array<string>
    }
}

export interface Video {
    type: 'video',
    id: string,
    styles: Style,
    content: VideoContent
}

export interface Article {
    type: 'article',
    id: string,
    styles: Style,
    content: ArticleContent
}

export type VideoArray = Array<Video>
export type ArticleArray = Array<Article>
export type dataArray = Array<Video|Article>