
import UniversalFunctions from "../../utils/universalFunctions";
import Joi from "joi";
import Controller from "../../controllers";

const Config = UniversalFunctions.CONFIG;

const getTasks = {
    method: "GET",
    path: "/api/tasks/getTasks",
    options: {
        description: "get Tasks",
        tags: ["api", "task"],
        handler: (request, h) => {
            console.log("route called")
            return new Promise((resolve, reject) => {
                Controller.TaskBaseController.getTasks(function (
                    err,
                    data
                ) {
                    if (err) reject(UniversalFunctions.sendError(err));
                    else
                        resolve(
                            UniversalFunctions.sendSuccess(
                                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                                data
                            )
                        );
                });
            });
        },
        validate: {
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

const createTask = {
    method: "POST",
    path: "/api/tasks/createTask",
    options: {
        description: "create Tasks",
        tags: ["api", "task"],
        handler: function (request, h) {
            let payload = {
                data: request.payload
            }
            return new Promise((resolve, reject) => {
                Controller.TaskBaseController.createTask(payload, function (
                    err,
                    data
                ) {
                    if (err) reject(UniversalFunctions.sendError(err));
                    else
                        resolve(
                            UniversalFunctions.sendSuccess(
                                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                                data
                            )
                        );
                });
            });
        },
        validate: {
            payload: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                expiryDate: Joi.date().required(),
                type: Joi.string().required(),
                workerRequired: Joi.boolean().required(),
                reward: Joi.number().required(),
                noOfWorkers: Joi.number().required(),
                translatedText: Joi.string().optional().allow(''),
                decisionBool: Joi.boolean().optional().allow(''),
                choice1: Joi.string().optional().allow(''),
                choice2: Joi.string().optional().allow(''),
                choice3: Joi.string().optional().allow(''),
                choice4: Joi.string().optional().allow(''),
            }).label("Task Object"),
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
}

const TaskBaseRoutes = [getTasks, createTask];
export default TaskBaseRoutes;