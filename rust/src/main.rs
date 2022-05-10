mod api;

use api::willys::{
    get_product
};

use actix_files::{Files};
use actix_web::{middleware::Logger, App, HttpServer, web};
use actix_cors::Cors;

use mongodb::{bson::doc, options::IndexOptions, Client, Collection, IndexModel};

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    std::env::set_var("RUST_LOG", "DEBUG");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let client = Client::with_uri_str("mongodb://mongo:27017").await.expect("failed to connect");

    HttpServer::new(move|| {

        let logger:Logger   = Logger::default();
        let cors:Cors       = Cors::default().allow_any_origin();

        App::new()
            .app_data(web::Data::new(client.clone()))
            .wrap(cors)
            .wrap(logger)
            .default_service(Files::new("", "./react").index_file("index.html"))
            .service(get_product)

    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}