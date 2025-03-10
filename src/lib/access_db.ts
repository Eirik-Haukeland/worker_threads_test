import type { Article, dataArray, Video } from "../../types/dataJson.js";
import { webcrypto } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { env } from "node:process";

let db: DatabaseSync
if(env.persist_db === 'true') {
  const dbName = env.db_name || 'example.db'
  db = new DatabaseSync(`${import.meta.dirname}/../../db/${dbName}`)
} else {
  db = new DatabaseSync(':memory:')
}

// Execute SQL statements from strings.
db.exec(`
  CREATE TABLE IF NOT EXISTS data(
    key TEXT PRIMARY KEY,
    value TEXT
  ) STRICT
`);

export const getData = () => {
    const query = db.prepare('SELECT * FROM data ORDER BY key');
    const dbData = query.all() as Array<{key: string, value: string}>
    return dbData.map(({value}) => value)
}
export const addItem = (data: Article|Video) => {
    const insert = db.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
    const uuid = webcrypto.randomUUID()
    data.id = uuid

    insert.run(uuid, JSON.stringify(data))
}
export const getItem = (id: string) => {
    const query = db.prepare('SELECT * FROM data ORDER BY key');
    const queryResault = query.get(id) as {key: string, value: string}
    
    return queryResault.value
}

export const populateDbWithSampleData = () => {
  const startUpData: dataArray = [
    {   
        type: "article", 
        id: "id_1234-1",
        styles: {
            sizes: {
                teaser: {
                    height: 200,
                    width: 200,
                    margin: 0,
                    padding: 0,
                    font_size: 8,
                },
                open: {
                    height: 2000,
                    width: 2000,
                    margin: 0,
                    padding: 0,
                    font_size: 80,
                }
            },
            colors: {
                backgound_color: "#ffffff",
                forground_color: "#000000"
            }
        },
        content: {
            img: "https://www.google.com/imgres?q=test&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F06%2F03%2F19%2F38%2Froad-sign-361514_960_720.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fno%2Fillustrations%2Ftrafikkskilt-forkj%25C3%25B8rsrett-test-361514%2F&docid=gZ4xfB3bq8sH8M&tbnid=WTTjGmMxFwHPHM&vet=12ahUKEwiQnI3g_O2LAxWlLhAIHRrTBRgQM3oECGQQAA..i&w=819&h=720&hcb=2&ved=2ahUKEwiQnI3g_O2LAxWlLhAIHRrTBRgQM3oECGQQAA",
            imgAlt_text: "asdf asd  s s s s sfsdfsf", 
            title_text: "Cras aliquam urna a nisi.",
            leadin_text: "Aenean nec tincidunt nibh. Maecenas eget nunc orci. Nam vel nibh at tortor efficitur varius a a dolor. Aliquam sed felis tellus. Nunc commodo tortor sit amet pellentesque pharetra. Quisque neque sem, ullamcorper quis viverra vitae, finibus a urna. Mauris tincidunt eros quam, sed laoreet tellus laoreet in. Integer vulputate lacus in erat venenatis finibus. Praesent mattis magna vitae sem pharetra, ac euismod dolor euismod. Nunc id pharetra ex. Phasellus mi ipsum, laoreet at consequat eu, facilisis vitae augue. Nullam porta quam elementum ex pharetra vulputate. Donec nisi urna, ultrices ut tristique ac, lobortis sit amet erat. Nam in bibendum leo. Etiam a sodales elit. Mauris sit amet lectus consequat, tincidunt dolor id, dignissim nisl.",
            body: {
                video: null,
                sub_title_text: null,
                text: [
                    "Aenean nec tincidunt nibh. Maecenas eget nunc orci. Nam vel nibh at tortor efficitur varius a a dolor. Aliquam sed felis tellus. Nunc commodo tortor sit amet pellentesque pharetra. Quisque neque sem, ullamcorper quis viverra vitae, finibus a urna. Mauris tincidunt eros quam, sed laoreet tellus laoreet in. Integer vulputate lacus in erat venenatis finibus. Praesent mattis magna vitae sem pharetra, ac euismod dolor euismod. Nunc id pharetra ex. Phasellus mi ipsum, laoreet at consequat eu, facilisis vitae augue. Nullam porta quam elementum ex pharetra vulputate. Donec nisi urna, ultrices ut tristique ac, lobortis sit amet erat. Nam in bibendum leo. Etiam a sodales elit. Mauris sit amet lectus consequat, tincidunt dolor id, dignissim nisl.",
                    "Donec a porttitor ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam rhoncus pharetra egestas. Cras id egestas lacus. Nullam aliquet nulla arcu. Nullam ac massa non elit eleifend iaculis eget eget sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse nec scelerisque urna. Proin ultrices sodales lacus, ac consequat turpis hendrerit vel. Aliquam laoreet nulla sed nulla vulputate, at rhoncus sem viverra.",
                    "Donec at cursus nibh. Maecenas id nunc sollicitudin, facilisis velit facilisis, ornare lorem. Maecenas accumsan rutrum scelerisque. Phasellus non massa eu justo dictum cursus eu pharetra nulla. Proin quis blandit mi. Quisque pulvinar lectus ac rhoncus tempus. Vestibulum sollicitudin at metus in porttitor. Donec ac aliquet diam, nec ultrices ligula. Curabitur luctus dolor vitae felis lacinia aliquet.",
                    "Suspendisse varius ex ullamcorper mauris viverra vestibulum. Aliquam sit amet volutpat turpis. Nam in porta lacus. Suspendisse id erat a orci lacinia porta vitae quis nulla. Nam tristique dapibus massa et ultrices. Nulla eget odio sit amet quam faucibus mollis. Nullam in ullamcorper dui. Etiam hendrerit nulla vel volutpat aliquet. Nullam ac mauris eros. Nam sit amet libero est. Maecenas mauris velit, porttitor ac ex eget, facilisis sodales lacus. Sed sed magna in velit rutrum congue id id orci. Vivamus sagittis non diam nec vulputate. Phasellus ut ligula nec ligula rutrum facilisis et eget massa. Pellentesque eu elit augue.",
                    "Nullam scelerisque malesuada nulla id faucibus. Vivamus aliquam varius metus, a pharetra elit semper sit amet. Praesent et sodales mi. Quisque eu nulla porta, venenatis dolor vitae, porta risus. Sed laoreet sapien at diam iaculis, at tempus ligula elementum. Nullam blandit iaculis vehicula. Duis non urna porttitor, fringilla est vel, luctus elit. Donec fermentum nibh eu erat cursus sagittis. Fusce vel risus in purus dictum euismod. Etiam accumsan euismod neque, sed placerat magna sodales at. Pellentesque sem lectus, viverra at malesuada vel, aliquet sed ex. Vivamus eu metus sit amet urna tincidunt consequat. Maecenas ut augue orci."
                ]
            }
        }
    },
    {
        type: "video",
        id: "id_1234-1",
        styles: {
            sizes: {
                teaser: {
                    height: 200,

                    width: 200,

                    margin: 0,

                    padding: 0,

                    font_size: 8,

                },
                open: {
                    height: 2000,

                    width: 2000,

                    margin: 0,

                    padding: 0,

                    font_size: 80,

                }
            },
            colors: {
                backgound_color: "#ffffff",
                forground_color: "#000000"
            }
        },
        content: {
            img: "https://www.google.com/imgres?q=test&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F06%2F03%2F19%2F38%2Froad-sign-361514_960_720.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fno%2Fillustrations%2Ftrafikkskilt-forkj%25C3%25B8rsrett-test-361514%2F&docid=gZ4xfB3bq8sH8M&tbnid=WTTjGmMxFwHPHM&vet=12ahUKEwiQnI3g_O2LAxWlLhAIHRrTBRgQM3oECGQQAA..i&w=819&h=720&hcb=2&ved=2ahUKEwiQnI3g_O2LAxWlLhAIHRrTBRgQM3oECGQQAA",
            imgAlt_text: "asdf asd  s s s s sfsdfsf", 
            title_text: "Cras aliquam urna a nisi.",
            leadin_text: "Aenean nec tincidunt nibh. Maecenas eget nunc orci. Nam vel nibh at tortor efficitur varius a a dolor. Aliquam sed felis tellus. Nunc commodo tortor sit amet pellentesque pharetra. Quisque neque sem, ullamcorper quis viverra vitae, finibus a urna. Mauris tincidunt eros quam, sed laoreet tellus laoreet in. Integer vulputate lacus in erat venenatis finibus. Praesent mattis magna vitae sem pharetra, ac euismod dolor euismod. Nunc id pharetra ex. Phasellus mi ipsum, laoreet at consequat eu, facilisis vitae augue. Nullam porta quam elementum ex pharetra vulputate. Donec nisi urna, ultrices ut tristique ac, lobortis sit amet erat. Nam in bibendum leo. Etiam a sodales elit. Mauris sit amet lectus consequat, tincidunt dolor id, dignissim nisl.",
            body: {
                video: [ "https://www.youtube.com/watch?v=u9lj-c29dxI&list=PL6B3937A5D230E335&index=2"],
                sub_title_text: 'textv asfdsafsafd',
                text: null,
            }
        }
    }
  ]

  startUpData.forEach(addItem)
}

// add startup data to the db if populate_db is true
if (env.populate_db === 'true') {
  populateDbWithSampleData()
}