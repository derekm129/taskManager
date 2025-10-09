"use client"
import { useGlobalState } from "@/app/context/globalProvider";
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { add, plus } from "@/app/utils/Icons";


function CreateContent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);
    const {theme} = useGlobalState();

// HandleChange
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
// Handle submit
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
// CreateContentStyled
    return <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
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
        <div className="submit-btn flex justify-end">
            <Button 
            type="submit"
            name="Create Task"
            icon={plus}
            padding={"1.2rem 2.4rem"}
            borderRad={"0.8rem"}
            fw={"500"}
            fs={"1.2rem"}
            color={theme.colorGrey1}
            background={theme.colorGreenDark}
            />
        </div>
    </CreateContentStyled>;
};

const CreateContentStyled = styled.form`
    >h1{
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
    }

    color: ${(props) => props.theme.colorGrey1};

    .input-control {
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;

        label{
            margin-bottom: 0.8;
            display: inline-block;
            font-size: clamp(0.9rem, 5vw, 1.2rem);
        }

        span{
            ${(props) => props.theme.colorGrey3};
        }

        input,
        textarea {
            width: 100%;
            border: none;
            padding: 1rem;

            resize: none;
            background-color: ${(props) => props.theme.colorGreyDark};
            color: ${(props) => props.theme.colorGrey2};
        }
    }


`;

export default CreateContent;