import { truncate } from "fs/promises";
import mongoose, { Schema, Document} from "mongoose";

interface IStep extends Document {
    title: string;
    difficulty: string;
    xpReward: number;
    completed: string;
    createdAt: Date;
}

const StepSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        difficulty: { type: String, required: true },
        xpReward: { type: Number, required: true},
        completed: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { versionKey: false }
);

const Step = mongoose.model<IStep>('Step', StepSchema);

export default Step;