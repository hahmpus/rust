use actix_web::{
    get,
    web::{Path, Json },
};
use serde::{Serialize, Deserialize};



#[derive(Serialize, Deserialize)]
pub struct SearchResultList {
    pub products: Vec<String>,
}

#[get("/api/ica/search/{query}")]
pub async fn search(query: Path<String>) -> Json<ProductList> {
    //maybe this should take requestdata instead of query?
    let url = format!("https://handla.ica.se/api/search-info/v1/search/skus?storeId=09937&searchTerm={}", &query);
    let client = reqwest::Client::new();

    let res = client
        .get(url)
        .send()
        .await.unwrap()
        .json::<SearchResultList>()
        .await.unwrap();

    let products = get_product_info(Json(res)).await;

    return products
}



#[derive(Serialize, Deserialize)]
#[serde(transparent)]
pub struct ProductList {
    pub products: Vec<Product>,
}

#[derive(Serialize, Deserialize)]
pub struct Product {
    pub sku: String,
    pub name: String,
    #[serde(default)]
    #[serde(alias="nutritionalText")] 
    pub nutritional_text: String,
    #[serde(default)]
    pub macros: Vec<String>,
}

pub async fn get_product_info(products: Json<SearchResultList>) -> Json<ProductList> {
    let mut url = "https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/maxi-ica-stormarknad-jonkoping-id_09937/products-data?skus=".to_string();
    let client = reqwest::Client::new();

    //append products to end url
    for (i, product) in products.products.iter().enumerate() {
        if i != 0 {
            url.push_str(",");
        }
        url.push_str(product);
    }

    let mut res = client
        .get(url)
        .send()
        .await.unwrap()
        .json::<ProductList>()
        .await.unwrap();

    //the json MIGHT have a "nutritionalText" field, split it by ", " if it exists
    for product in res.products.iter_mut() {
        if product.nutritional_text.len() > 0 {
            product.macros = product.nutritional_text.split(", ").map(|s| s.to_string()).collect();
        }
    }

    Json(res)
}