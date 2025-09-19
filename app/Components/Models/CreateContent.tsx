"use client"
import { useGlobalState } from "@/app/context/globalProvider";
import React, {useState, ChangeEvent} from "react";

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
            setCompleted(e.target.checked);
            break;
        case "important":
            setImportant(e.target.checked);
            break;
        default:
            break;
        }
    };

    return <div>
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
    </div>;
};

export default CreateContent;