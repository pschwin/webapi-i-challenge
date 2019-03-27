// implement your API here
// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db.js');
server.use(express.json()); 

server.get('/', (req, res) => {
    res.send("Hello ");
})

server.get('/users', (req, res) =>{
    db.find().then(users =>{
        res.status(200).json(users).end()
    }).catch(error => {
        res.status(500).json({message: 'The users information could not be retrieved.'});
    })
})

server.post('/users', (req, res) => {
    const userInfo = req.body
    db.insert(userInfo).then(user =>{
        res.status(201).json(user);
    }).catch(error =>{
        res.status(400).json({message: 'Please provide name and bio for the user.'});
    })
})

server.delete('/users/:id', (req, res) =>{
    const id = req.params.id;
    db.remove(id).then(deleted =>{
        res.status(204).end()
    }).catch(error =>{
        res.status(500).json({message: '"The user could not be removed"'});
    })
    
})

server.put('/users/:id', (req, res)=>{
    const {id} = req.params;
    const user = req.body;
    db.update(id, user).then(updated =>{
        if(updated){
            res.status(200).json(updated)
        }else{
            res.status(404).json({message: 'The user with the specified ID does not exist.'})
        }
    }).catch(error =>{
        res.status(500).json({message: 'The user information could not be modified.'});
    })
})

server.get('/users/:id', (req,res) =>{
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if (user){
            res.status(200).json({succes: true, user})
        }else { 
            res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
        }
    }).catch(({code, message}) =>{
        res.status(code).json({success: false, message: 'The user information could not be modified.'})
    })
})

server.listen(5000, () => {
    console.log('*** API Running on port: 5000 ***')
})