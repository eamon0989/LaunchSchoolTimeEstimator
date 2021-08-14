const courseRouter = require('express').Router();
const Course = require('../models/course');

courseRouter.get('/', (request,response) => {
  Course.find().then(course => {
    response.json(course)
  })
})

courseRouter.post('/', (request,response) => {
  const body = request.body;
  const course = new Course({
    course: body.course,
    hours: body.hours
  }) 

  course.save()
    .then(course => {
      response.json(course.toJSON())
    })
     .catch(error => next(error)); 
})



module.exports = courseRouter;