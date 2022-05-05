static USER_AGENT:&str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36"; 

use actix_web::{
    get, 
    post, 
    put,
    error::ResponseError,
    web::Path,
    web::Json,
    web::Data,
    HttpResponse,
    http::{header::ContentType, StatusCode}
};
use serde::{Serialize, Deserialize};



//INGRIDIENT CODE
#[derive(Deserialize, Serialize, Debug)]
pub struct Ingridient {
    pub ean: String,
    pub name: String,
    #[serde(alias="nutritionsFactList")]
    pub nutritions_fact_list: Vec<Macro>
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Macro {
    #[serde(alias="typeCode")]
    pub type_code: String,

    #[serde(alias="unitCode")]
    pub unit_code: String,
    pub value: String,
}

#[derive(Deserialize)]
pub struct ProductIdentifier {
    pub product_id: String,
}

#[get("/api/willys/{product_id}")]
pub async fn get_product(product_id: Path<ProductIdentifier>) -> Json<Ingridient> {
    let url = format!("https://www.willys.se/axfood/rest/p/{}", &product_id.product_id);
    let client = reqwest::Client::new();

    let res = client
        .get(url)
        .header("User-agent", USER_AGENT)
        .send()
        .await.unwrap()
        .json::<Ingridient>()
        .await.unwrap();

    Json(res)
}