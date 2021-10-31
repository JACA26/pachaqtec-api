// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;



// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ============================
// Token ExpireIn
// ============================
process.env.EXPIRES_IN = process.env.EXPIRES_IN ||'48h';



// ============================
//  Token Secret
// ============================
process.env.SEED = process.env.SEED || 'seed-development';



// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/pachaqtec';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URL_DB = urlDB;



