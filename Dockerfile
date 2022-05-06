FROM rust:1.60 as rust-builder
WORKDIR /usr/src/calorie
COPY rust .
RUN cargo build --release

FROM node:18 as react-builder
WORKDIR /usr/src/app
COPY react .
RUN npm install 
RUN npm run build

FROM debian:buster-slim
RUN apt-get update && apt-get install libssl1.1 openssl ca-certificates
COPY --from=rust-builder /usr/src/calorie/target/release/calorie /app/calorie
COPY --from=react-builder /usr/src/app/build /app/react

WORKDIR /app

CMD ["./calorie"]

# cargo run --manifest-path rust/Cargo.toml
# docker build -t calorie .
# docker run --rm -p 8080:8080 --name calorie-docker calorie