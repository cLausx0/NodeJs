const instructors = {
};

const sequenceId = Object.values(instructors).length + 1;

const sequence = {
  _id: sequenceId,
  get id() { return this._id++; },
};

function addInstructor(instructor) {
  const newInstructor = instructor;
  if (!newInstructor.id) newInstructor.id = sequence.id;
  instructors[newInstructor.id] = newInstructor;
  return instructor;
}

function getInstructor(id) {
  return instructors[id] || {};
}

function getInstructors() {
  return Object.values(instructors);
}

function deleteInstructor(id) {
  const instructor = instructors[id] || {};
  if (instructors.hasOwnProperty(id)) {
    delete instructors[id];
  }
  return instructor;
}

module.exports = {
  addInstructor, getInstructor, getInstructors, deleteInstructor,
};
