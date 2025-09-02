"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import themes from "@/app/context/themes";


function Sidebar() {
    const { theme } = useGlobalState();

    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (link: string) => {
        router.push(link);
    }

    return <SidebarStyled theme={theme}>
        <div className="profile">
            <div className="profile-overlay"></div>
            <div className="image">
                <Image width ={75} height={75} src="/Images/bender.png" alt="profile"/>
            </div>
             <h1>
                <span>John</span>
                <span>DS</span>
             </h1>
        </div>
        <ul className="nav-items">
            {menu.map((item) => {

                const link = item.link;
                return (
                <li className={`nav-item ${pathname === link ? "active": ""}`} key={item.id} onClick={() => {
                    handleClick(link);
                }}>
                    {item.icon}
                    <Link href={link}>{item.title}</Link>
                </li>
                );
            })} 
        </ul>
        <button></button>
    </SidebarStyled>;
}

const SidebarStyled = styled.nav`
    position: relative;
    width: ${(props) => props.theme.sidebarWidth};
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${(props) => props.theme.colorGrey3};

    .profile{
        margin: 1.5rem;
        position: relative;
        padding: 1rem 0.8rem;
        border-radius: 1rem;
        cursor: pointer;
        font=weight: 500;
        color: ${(props) => props.theme.colorGrey0};
    }

`;

export default Sidebar;