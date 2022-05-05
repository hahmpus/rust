
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

#[derive(Deserialize)]
pub struct ProductIdentifier {
    pub product_id: String,
}

#[get("/api/willys/{product_id}")]
pub async fn get_product(product_id: Path<ProductIdentifier>) -> Json<String> {
    return Json("Hello Willys {product_id}".to_string())
}