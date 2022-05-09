static MONGO_CLIENT:&str = "mongodb://localhost:27017/";
static MONGO_DB:&str = "mydb";

use mongodb::{
    bson::doc, 
    sync::Client
};

pub struct Test {
    pub name: String
}

fn test() -> mongodb::error::Result<()> {
    let client      = Client::with_uri_str(MONGO_CLIENT)?;
    let database    = client.database(MONGO_DB);

    return database.collection("test").insert_one(doc! { "name": "test" }, None);
}