const express = require('express');
const db = require('./users/userDb')
const userRouter = require('./users/userRouter')
const server = express();

server.use(express.json())
server.use(logger())
server.use('/api/users', userRouter)



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(){
  return (req, res, next)=> {
      console.log(`the request was a ${req.method} was made to ${req.url} at ${new Date()}`)
      next()
  }
}

// function validateUserId(id){
//   return (req, res, next) => {
//     db.getById(id)
//     .then(post => {
//       if(post.id){
//         req.user = post.id
//       }
//       else {
//         res.status(400).json({message: 'there was an error'})
//       }
//     })
//   }
// }

module.exports = server;
