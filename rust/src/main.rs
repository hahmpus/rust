mod api;


use api::ica::{
    search
};

use api::recipie::{
    get_recipie,
    add_recipie,
    update_recipie,
    list_recipies
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

   let client = Client::with_uri_str("mongodb://calorie:9DSd!f*vRJ28&TY!@mongo:27017/test").await.expect("failed to connect");

    HttpServer::new(move|| {

        let logger:Logger   = Logger::default();
        let cors:Cors       = Cors::default().allow_any_origin();

        App::new()
            .app_data(web::Data::new(client.clone()))
            .wrap(cors)
            .wrap(logger)
            .default_service(Files::new("", "./react").index_file("index.html"))
            .service(search)
            .service(get_recipie)
            .service(add_recipie)
            .service(update_recipie)
            .service(list_recipies)

    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}