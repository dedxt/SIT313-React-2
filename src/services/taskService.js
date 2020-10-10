import Models from '../models';

const updateTask = function (criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.Task.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert User in DB
const createTask = function (objToSave, callback) {
  new Models.Task(objToSave).save(callback);
};
//Delete User in DB
const deleteTask = function (criteria, callback) {
  Models.Task.findOneAndRemove(criteria, callback);
};

//Get Users from DB
const getTask = function (criteria, projection, options, callback) {
  options.lean = true;
  Models.Task.find(criteria, projection, options, callback);
};



export default {
    updateTask,
    getTask,
    deleteTask,
    createTask
};
