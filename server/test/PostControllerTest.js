const expect = require('chai').expect
const PostController = require('../controllers/PostController')

describe('Controller for post model', function () {


  describe('find should find a list of post', function () {
    it('should handle all post', function () {
      const results = PostController.find
      expect(results).to.be('function')
    })
  })

  /*describe('findById should find one post', function () {
    it('should handle one particular post')
  })

  describe('create should insert a post', function () {
    it('should handle creating a post')
  })

  describe('update should edit post', function () {
    it('should handle changing a post')
  })

  describe('delete should delete a post', function () {
    it('should remove post')
  })*/
})
