mod api;

use api::willys::{
    get_product
};

use actix_files::{Files};
use actix_web::{middleware::Logger, App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    std::env::set_var("RUST_LOG", "DEBUG");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    HttpServer::new(|| {

        let logger = Logger::default();

        App::new()
            .wrap(logger)
            .default_service(Files::new("", "./react/build").index_file("index.html"))
            .service(get_product)

    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}