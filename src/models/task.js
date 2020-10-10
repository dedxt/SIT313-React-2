import mongoose, { Schema } from "mongoose";
import APP_CONSTANTS from "../config/appConstants"

var task = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    expiryDate: { type: Date, required: true },
    type: {
        type: String, enum: [
            APP_CONSTANTS.DATABASE.TASK_ROLES.CHOICE,
            APP_CONSTANTS.DATABASE.TASK_ROLES.DECISION_MAKING,
            APP_CONSTANTS.DATABASE.TASK_ROLES.SENTENCE_LEVEL,
        ]
    },
    createdAt: { type: Date, default: Date.now() },
    workerRequired: { type: Boolean, },
    reward: { type: Number },
    noOfWorkers: { type: Number },
    translatedText: { type: String },
    decisionBool: { type: String },
    choice1: { type: String },
    choice2: { type: String },
    choice3: { type: String },
    choice4: { type: String },
});

module.exports = mongoose.model("task", task);
