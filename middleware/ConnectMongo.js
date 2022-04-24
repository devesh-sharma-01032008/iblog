import {MongoClient, ServerApiVersion} from "mongodb";
const {MONGO_DB, MONGO_URI} =   process.env;


let cachedClient, cachedDb;

export async function connectToDatabase(){
  if(cachedClient && cachedDb){
    return {
      client: cachedClient,
      db: cachedDb
    };
  }

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  }

  let client = new MongoClient(MONGO_URI,opts);
  await client.connect();
  let db = client.db(MONGO_DB);
  cachedClient = client;
  cachedDb = db;
  return {
    client: cachedClient,
    db: cachedDb
  }
}