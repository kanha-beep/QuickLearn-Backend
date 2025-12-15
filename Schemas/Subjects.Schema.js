import * as mongoose from 'mongoose'
export const SubjectsSchema = new mongoose.Schema({
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Single_Subject"
    }]
});