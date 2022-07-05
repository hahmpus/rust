//db.auth("calorie","9DSd!f*vRJ28&TY!");
db.createUser({
    user: "calorie",
    pwd: "9DSd!f*vRJ28&TY!",
    roles: [{
        role: "readWrite",
        db: "calorie"
    }]
});