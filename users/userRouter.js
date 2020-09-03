const express = require('express');
const db = require('./userDb')
const postDB = require('../posts/postDb')
const router = express.Router();


router.post('/', validateUser(), (req, res) => {
  db.insert(req.body)
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(() => res.status(404).json({ error: 'cannot find the id'}))
});

router.post('/:id/posts', validateUserId(), validatePost(),(req, res) => {
  // do your magic!
  const postData = { ...req.body, user_id: req.params.id}
  postDB.insert(postData)
  .then(newPost => {
    res.status(200).json(newPost)
  })
  .catch(()=> res.status(400).json({errorMessage: 'Make sure to fill the correct fields'}))

});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(() => res.status(404).json({ errorMessage: 'error finding users'}))
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  db.getById(req.params.id)
  .then(user => {
    res.status(200).json(req.user)
  })
  .catch(() => {
    res.status(500).json({message: 'error finding user'})
  })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => res.status(500).json({ errorMessage: 'error finding the posts'}))
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  db.remove(req.params.id)
  .then(delPost => {
    res.status(200).json({ message: 'the user has been incinerated' })
  })
  .catch(() => res.status(500).json({ error: 'there was an error while deleting the user'}))
});

router.put('/:id', validateUserId(), (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
  .then(count => {
    count === 1 ? res.status(200).json(req.body) : res.status(404).json({message: "the post cannot be found"})
  })
});

//custom middleware

function validateUserId(){
  return (req, res, next) => {
    db.getById(req.params.id)
    .then(user => {
      if(user){
        console.log(user)
        req.user = user
      }
      else {
        res.status(400).json({message: 'invalid user id'})
      }
    })
    next()
  }
}

function validateUser(){
  // do your magic!
  return (req,res,next) => {
    if(!req.body){
      res.status(400).json({message: "missing user data"})
  } else if(!req.body.name){
    res.status(400).json({message: "missing required name field"})
  }
  next();
}
}

function validatePost(){
  // do your magic!
  return (req,res,next) => {
    if(!req.body){
      res.status(400).json({message: "missing user data"})
  } else if(!req.body.text){
    res.status(400).json({message: "missing required text field"})
  }
  next();
}

}

module.exports = router;
