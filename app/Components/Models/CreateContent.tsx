"use client"
import { useGlobalState } from "@/app/context/globalProvider";
import React, {useState, ChangeEvent} from "react";
import axios from "axios";
import toast from "react-hot-toast";

function CreateContent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);

    const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch(name) {
        case "title":
            setTitle(e.target.value);
            break;
        case "description":
            setDescription(e.target.value);
            break;
        case "date":
            setDate(e.target.value);
            break;
        case "completed":
            setCompleted((e.target as HTMLInputElement).checked);
            break;
        case "important":
            setImportant((e.target as HTMLInputElement).checked);
            break;
        default:
            break;
        }
    };

    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const task = {
            title, 
            description, 
            date, 
            completed, 
            important
        };

        try {
            const res = await axios.post("/api/tasks", task);
            if(res.data.error) {
                toast.error(res.data.error);
            }

            toast.success("Task created succussfully.");
        } catch(error) {
            toast.error("Something went wrong.")
            console.log(error);
        }
    };

    return <form onSubmit={handleSubmit}>
        <h1>Create a Task</h1>
        {/* Title */}
        <div className="input-control">
            <label htmlFor="title">Title</label>
            <input 
                value={title}
                type="text"
                id="title"
                name="title"
                onChange={handleChange("title")}
                placeholder="Title"
            />
        </div>
        {/* Description */}
         <div className="input-control">
            <label htmlFor="description">Description</label>
            <textarea 
                value={description}
                onChange={handleChange("description")}
                name="description"
                id="description"
                rows={4}
                placeholder="e.g, Watch a video about Next.js Auth"
            ></textarea>
        </div>
        {/* Date */}
        <div className="input-control">
            <label htmlFor="date">Date</label>
            <input 
                value={date}
                onChange={handleChange("date")}
                type="date"
                name="date"
                id="date"  
            />
        </div>
        {/* Completed */}
        <div className="input-control">
            <label htmlFor="completed">Toggle Completed</label>
            <input 
                value={completed.toString()}
                onChange={handleChange("completed")}
                type="checkbox"
                name="completed"
                id="completed"  
            />
        </div>
        {/* Important */}
        <div className="input-control toggler">
            <label htmlFor="completed">Toggle Important</label>
            <input 
                value={important.toString()}
                onChange={handleChange("important")}
                type="checkbox"
                name="important"
                id="important"  
            />
        </div>
        {/* Submit */}
        <div className="submit-btn">
            <button type="submit">Submit</button>
        </div>
    </form>;
};

export default CreateContent;