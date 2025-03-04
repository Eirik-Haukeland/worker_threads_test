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
// Create a prepared statement to insert data into the database.
const insert = db.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
// Create a prepared statement to read data from the database.
const query = db.prepare('SELECT * FROM data ORDER BY key');


export const getData = () => {
    const dbData = query.all() as Array<{key: string, value: string}>
    return dbData.map(({value}) => value)
}
export const addItem = (data: Article|Video) => {
    const uuid = webcrypto.randomUUID()
    data.id = uuid

    insert.run(uuid, JSON.stringify(data))
}
export const getItem = (id: string) => {
    const queryResault = query.get(id) as {key: string, value: string}
    
    return queryResault.value
}