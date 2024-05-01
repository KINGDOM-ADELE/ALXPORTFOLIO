// CREATE A SERVER
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

process.on('uncaughtException', (err) => {// this should be at the top, before we require app,  to be able to catch unccaught exceptions
    console.log(err.name, err.message)
    console.log('Uncaught Exception occured shutting down...')
    server.close(() => {
        process.exit(1)
    })
  })

const app = require('./app')


// //  Add CORS headers
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000', 'http://127.0.0.1:3000'  );
//     next();
//   });

//DETERMINING CONNECTION STRING/URL
console.log("process.env.TESTING_FOR_PRODUCTION: "+process.env.TESTING_FOR_PRODUCTION)
console.log("process.env.NODE_ENV: "+process.env.NODE_ENV)

let URL, HOST;
if(process.env.TESTING_FOR_PRODUCTION === 'true' && process.env.NODE_ENV === "production"){
    console.log("NODE_ENV === production (testing)")
    console.log("CONN: "+process.env.TEST_CONN)
    URL = process.env.TEST_CONN
    HOST = process.env.DEV_HOST
}
else if(process.env.NODE_ENV === "development"){
    console.log("NODE_ENV: development")

    URL = process.env.LOCAL_CONN
    HOST = process.env.DEV_HOST
}
else{
    console.log("NODE_ENV: production")
    URL = process.env.HOSTED_CONN 
    HOST = process.env.PROD_HOST 
}

//db connection start
mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: true
})
    const connection = mongoose.connection
    //for one time listening
    // connection.once('open', () => {
    //     console.log('Mongoose connected with DB')
    // })
    // connection.once('error', (err) => {
    //     console.log(err)
    // })  
    // connection.once('disconnect', () => {
    //     console.log('Mongoose disonnected with DB')
    // })   
    
    //for one time listening
    connection.on('open', () => {
        console.log('Mongoose connected with mongoDB')
    })
    connection.on('error', (err) => {
        console.log('Mongoose failed connect with mongoDB')
        console.log('Error report starts')
        console.log(err)
        console.log('Error report ends')
    })  
    connection.on('disconnect', () => {
        console.log('Mongoose disonnected with mongoDB')
    }) 

  process.on('unhandledRejection', (err) => {
      console.log('unhandled rejection occured ...')
    console.log(err.name, err.message)
    console.log('unhandled rejection action shutting down...')
    server.close(() => {
        process.exit(1)
    })
  })


//db connection end

const port = process.env.PORT || 7800
const serverName = "MrSoftTraining"
const server = app.listen(port, () => {
    const host= server.address().address 
    console.log(`${serverName} server already running on port ${port}`)
    console.log(`server URL: http://${host}:${port}`)
    console.log(`client URL: http://${HOST}`)

    console.log(`...waiting for database connection...`)
})