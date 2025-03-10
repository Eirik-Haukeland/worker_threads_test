import Fastify from "fastify";
import { getData, populateDbWithSampleData } from "./lib/access_db.ts";
import { filterDuplicates, getArticle, getVideos, parseData } from "./lib/prosess_data.ts";

const fastify = Fastify();

fastify.get("/simple", async (_, reply) => {
    const stringData = getData()
    const jsonData = filterDuplicates(parseData(stringData))
    const videos = getVideos(jsonData)
    const articles = getArticle(jsonData)

    return reply.send({
        amounts: {
            videos: videos.length,
            articles: articles.length
        },
        videos,
        articles
    })
})

fastify.get("/populate", async (_, reply) => {
    populateDbWithSampleData();
    const stringData = getData()
    const jsonData = filterDuplicates(parseData(stringData))
    const videos = getVideos(jsonData)
    const articles = getArticle(jsonData)

    return reply.send({videos: videos.length, articles: articles.length})
})

fastify.get('/', (_, reply) => {
    reply.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>testing node functions</title>
                <script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" crossorigin="anonymous"></script>
            </head>
            <body>

            </body>
        </html>    
    `)
})

fastify.setErrorHandler((error, _, reply) => {
    console.error(error)
    return reply.send(error)
})

fastify.listen({port: 3000, host: 'localhost'}, (err, address) => {
    if (err) throw err
    console.log(`server listening on ${address}`)
})