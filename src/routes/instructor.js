const express = require('express');
const instructor = require('../conttrollers/ControllerInstructors');

const router = express.Router();

router.post('/', (req, res) => {
  const instructors = {
    registration: req.body.registration,
    name: req.body.name,
    email: req.body.email,
    birth_date: req.body.birth_date,
  };
  instructor.addInstructor(instructors);
  res.status(201).json(instructors);
});

router.get('/', (req, res) => {
  res.status(200).json(instructor.getInstructors());
});

router.get('/:instructorId', (req, res) => {
  res.status(200).json(instructor.getInstructor(req.params.instructorId));
});

router.delete('/:instructorId', (req, res) => {
  res.status(200).json(instructor.deleteInstructor(req.params.instructorId));
});

router.put('/:instructorId', (req, res) => {
  const id = req.params.instructorId;
  const instructors = req.body;
  const newInstructor = instructor.changeInstructor(id, instructors);
  res.status(200).json(newInstructor);
});

module.exports = router;
