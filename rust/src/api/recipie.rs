use mongodb::{bson::doc, bson::to_document, Client, Collection};
use futures::StreamExt;
use actix_web::{
    get,
    post,
    web::{Path, Data, Form, Payload, BytesMut},
    HttpResponse,
};
use serde::{Serialize, Deserialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct Recipie {
    pub id: String,
    pub name: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ActualRecipie {
    pub id: String,
    pub name: String,
    //pub ingredients: Vec<Ingridient>,
}

//GET
#[get("/api/recipie/{id}")]
pub async fn get_recipie(client: Data<Client>, id: Path<String>) -> HttpResponse {
    let id = id.into_inner();
    let collection: Collection<Recipie> = client.database("calorie").collection("recipies");
    
    match collection
        .find_one(doc! { "id": &id }, None)
        .await
    {
        Ok(Some(user)) => HttpResponse::Ok().json(user),
        Ok(None) => {
            HttpResponse::NotFound().body(format!("No recipie found with id {}", id))
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

//POST
#[post("/api/recipie")]
pub async fn add_recipie(client: Data<Client>, mut data: Payload) -> HttpResponse {
    let mut body = BytesMut::new();
    while let Some(chunk) = data.next().await {
        let chunk = chunk.unwrap();
        body.extend_from_slice(&chunk);
    }
    let recipie_data = serde_json::from_slice::<Recipie>(&body).unwrap();

    let doc = to_document(&recipie_data).unwrap();

    let recipies = client.database("calorie").collection("recipies");

    match recipies.insert_one(doc.clone(), None).await {
        Ok(_) => HttpResponse::Ok().body("Recipie added"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

//POST
//SHOULD BE ABLE TO DELETE?
#[post("/api/recipie/{id}")]
pub async fn update_recipie(client: Data<Client>, id: Path<String>, mut data: Payload) -> HttpResponse {
    let id = id.into_inner();

    let mut body = BytesMut::new();
    while let Some(chunk) = data.next().await {
        let chunk = chunk.unwrap();
        body.extend_from_slice(&chunk);
    }

    let recipie_data = serde_json::from_slice::<Recipie>(&body).unwrap();
    let doc = to_document(&recipie_data).unwrap();

    let recipies: Collection<Recipie> = client.database("calorie").collection("recipies");
    //let recipie = data.into_inner();
    match recipies.find_one_and_update(doc! { "id": &id }, doc! { "$set": &doc }, None).await {
        Ok(_) => HttpResponse::Ok().body("Recipie updated"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

//HKTODO REMEMBER TO SWITCH OUT NAME FOR ID