import { truncate } from "fs/promises";
import mongoose, { Schema, Document} from "mongoose";

interface IProject extends Document {
    title: string;
    xp: number;
    level: string;
    progress: number;
    status: string
    createdAt: Date;
}

const ProjectSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        xp: { type: Number, required: true },
        level: { type: String, required: true},
        progress: { type: String, required: true },
        status: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { versionKey: false }
);

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;