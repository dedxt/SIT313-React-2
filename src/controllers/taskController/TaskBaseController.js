import Service from '../../services';
import async from "async";
import UniversalFunctions from "../../utils/universalFunctions";


const getTasks = (callback) => {
    let tasks;
    async.series([(cb) => {
        Service.TaskService.getTask({}, { __v: 0 }, {}, (err, data) => {
            if (err) cb(err)
            else {
                tasks = data;
                cb();
            }
        })
    }],
        (err, result) => {
            if (err) callback(err);
            else callback(null, { tasks });
        });
};

const createTask = (payload, callback) => {
    let tasks;
    async.series([
        (cb) => {
            if (payload.data.type == UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.TASK_ROLES.CHOICE) {
                if (payload.data.choice1 == undefined || payload.data.choice1 == null || payload.data.choice1 == "" ||
                    payload.data.choice2 == undefined || payload.data.choice2 == null || payload.data.choice2 == "" ||
                    payload.data.choice3 == undefined || payload.data.choice3 == null || payload.data.choice3 == "" ||
                    payload.data.choice4 == undefined || payload.data.choice4 == null || payload.data.choice4 == "")
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INPUT_ALL_CHOICES)
                else cb()
            } else if (payload.data.type == UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.TASK_ROLES.DECISION_MAKING) {
                if (payload.data.decisionBool == undefined || payload.data.decisionBool == null || payload.data.decisionBool == "")
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.CORRECT_DECISION_MISSING)
                else cb()
            } else if (payload.data.type == UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.TASK_ROLES.SENTENCE_LEVEL) {
                if (payload.data.translatedText == undefined || payload.data.translatedText == null || payload.data.translatedText == "")
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.TRANSLATION_TEXT_MISSING)
                else cb();
            } else cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TASK_TYPE);
        }, (cb) => {
            Service.TaskService.createTask(payload.data, (err, data) => {
                if (err) cb(err)
                else if (data.length === 0) {
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.NO_TASK_FOUND);
                } else {
                    tasks = data;
                    cb();
                }
            })
        }], (err, result) => {
            if (err) callback(err);
            else callback(null, { tasks });
        })

};

module.exports = {
    getTasks: getTasks,
    createTask: createTask
};