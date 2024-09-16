"use client";

import Link from "next/link";

import { Typography } from "./components/Typography";

export const NotFoundContent = () => {
    return (
        <>
            <Typography variant="h600">Not Found</Typography>
            <Typography>
                <Link href="/">Return Home</Link>
            </Typography>
        </>
    );
};
