//Server creation

const { request } = require("express")

//1 import express

const express = require('express')

//import dataservices

const dataService=require('./services/data.service')

//import cors
const cors = require('cors')



//import jwt

const jwt=require('jsonwebtoken');
//2 create an application using express

const app = express()

//To parse Json from request body

app.use(express.json())

//give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200','http://192.168.1.6:8080']
}))

//3 create a port number

app.listen(3000,() => {
 console.log('Listening on port 3000');
})
//Application middleware
const appMiddleware=(req,res,next)=>{
    console.log('Application specific middleware');
    next();
}
app.use(appMiddleware)

//Router specific middleware
const jwtMiddleware=(req,res,next)=>{
    try{
        console.log('Router specific middleware');    
        // const token=req.body.token;
        const token=req.headers['x-access-token'];
        const data=jwt.verify(token,'superkey2022');
        console.log(data);
        next();
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'Please login First'
        })
    }

}



// //4 resolving HTTP request
// // get, post, put, patch, delete

// //Resolving get request

// app.get('/',(req,res) => {
//     res.send('Get request')
// })

// //Resolving post request

// app.post('/',(req,res) => {
//     res.send('Post request')
// })

// //Resolving put request

// app.put('/',(req,res) => {
//     res.send('Put request')
// })

// //Resolving patch request

// app.patch('/',(req,res) => {
//     res.send('Patch request')
// })

// //Resolving delete request

// app.delete('/',(req,res) => {
//     res.send('Delete request')
// })



//API request
//registration request
app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
// app.post('/register',(req,res)=>{
//     console.log(req.body);
//     const result=dataservices.register(req.body.acno,req.body.username,req.body.password)
//     res.status(result.statusCode).json(result);
//     if(result){
//         res.send('register successful')
//     }
//     else
// {    res.send('already registered')}

// login request
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })

})
// deposit request
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.pswd,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
// withdraw request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })    
})
// transaction request
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
// delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})