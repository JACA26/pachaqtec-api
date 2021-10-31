

const express = require("express");
const mongoose = require('mongoose');
const path = require('path');

class Server {
    
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
        this.mongoose = mongoose;
        this.public = path.join(__dirname, '../../public');
	}
    
	middlewares() {
        
		//CORS middleware
		this.app.use(require("../middlewares/corsMiddleware"));
        
        //static files
		this.app.use(express.static(this.public));
        
        //body-parser middleware
		this.app.use(express.json());
        
        //express urlencoded
		this.app.use(express.urlencoded({ extended: false }));
        
	}
    
    //connect to mongoDB
    connectDB(){
        //connect to mongoDB
        this.mongoose.connect(process.env.URL_DB,{
            useNewUrlParser:true, 
            useCreateIndex:true, 
            useUnifiedTopology:true
        }, (err, res) => {
            if (err) throw err;
            console.log('DB ONLINE');
        });
    }
    
    
	routes() {
		//use routes
		this.app.use("/api", require("../routes/index"));
        
		//redirect invalid routes
		this.app.use("/*", (req, res) => {
			res.status(404).sendFile(path.join(this.public, '404.html'));
		});
	}
    
	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
    
	start() {
        this.middlewares();
        this.connectDB();
		this.routes();
		this.listen();
	}
}

module.exports = Server;
