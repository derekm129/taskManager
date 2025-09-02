"use client";

import { defaultConfig } from 'next/dist/server/config-shared';
import React from 'react';
import style from "styled-components";

interface Props{
    children: React.ReactNode;
}

function GlobalStyleProvider({children }: Props) {
    return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = style.div`
    background-color: red;
`;

export default GlobalStyleProvider;