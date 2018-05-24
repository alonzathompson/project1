const express = require('express')
const apiRouter = express.Router()
const PostController = require('../controllers/PostController')
const controllers = require('../controllers') //if the file you are getting is index don't have to right it

apiRouter.get('/:resource', function (req, res, next) {
  const resource = req.params.resource // storing the param(url param) in resource
  const controller = controllers[resource] //selecting controller based on resource

  if (controller == null) {
    res.json({
      confirmation: 'FAIL',
      message: 'Resource Not Found: ' + resource
    })
    return
  }

  controller.find(req.query, function (err, results) {
    if (err) {
      res.json({
        confirmation: 'FAIL',
        message: 'Not Found'
      })
      return
    }
    res.json({
      confirmation: 'SUCCESS',
      results: results
    })
  })
})

apiRouter.get('/:resource/:id', function (req, res, next) {
  const resource = req.params.resource
  const id = req.params.id

  var controller = controllers[resource] //selecting controller based on resource

  if (controller == null) {
    res.json({
      confirmation: 'FAIL',
      message: 'Resource Not Found: ' + resource
    })
    return
  }

  controller.findById(id, function(err, results) {
    if (err) {
      res.json({
        confirmation: 'Fail',
        message: err
      })
      return
    }
    res.json({
      confirmation: 'SUCCESS',
      results: results
    })
  })
})

apiRouter.post('/:resource', function (req, res, next) {
  const resource = req.params.resource
  const controller = controllers[resource] //selecting controller based on resource

  if (controller == null) {
    res.json({
      confirmation: 'FAIL',
      message: 'Resource Not Found: ' + resource
    })
    return
  }
  controller.create(req.body, function (err, results) {
    console.log(req.body)
    if (err) {
      res.json({
        confirmation: 'FAIL',
        message: err
      })
      return
    }
    res.json({
      confirmation: 'SUCCESS',
      results: results
    })    
  })
})

module.exports = apiRouter
