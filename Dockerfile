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
COPY --from=rust-builder /usr/src/calorie/target/release/calorie /app/calorie
COPY --from=react-builder /usr/src/app/build /app/react/build

WORKDIR /app

CMD ["./calorie"]

# cargo run --manifest-path rust/Cargo.toml
# docker build -t calorie .
# docker run -p 8080:8080 calorie