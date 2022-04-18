import {ReactNode} from "react";

export interface StandardHeadProp {
    children?: ReactNode[],
    title: string,
    description: string,
    updatedAt?: string
    image?: string
}