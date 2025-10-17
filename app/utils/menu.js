import { mailIcon, check, triangle, home } from "./Icons";

const menu = [
    {
        id: 1,
        title: "ALL TASKS",
        icon: home,
        link: "/",
    },
    {
        id: 2,
        title: "IMPORTANT",
        icon: triangle,
        link: "/important",
    },
    {
        id: 4,
        title: "INCOMPLETE",
        icon: mailIcon,
        link: "/incomplete",
    },
    {
        id: 3,
        title: "COMPLETED!",
        icon: check,
        link: "/completed",
    },
]

export default menu;