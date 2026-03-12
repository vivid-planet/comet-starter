import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    argTypes: {
        variant: {
            control: "select",
            options: ["contained", "outlined", "text"],
        },
        disabled: {
            control: "boolean",
        },
        children: {
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
    args: {
        variant: "contained",
        children: "Contained Button",
    },
};

export const Outlined: Story = {
    args: {
        variant: "outlined",
        children: "Outlined Button",
    },
};

export const Text: Story = {
    args: {
        variant: "text",
        children: "Text Button",
    },
};

export const Disabled: Story = {
    args: {
        variant: "contained",
        children: "Disabled Button",
        disabled: true,
    },
};

export const AsLink: Story = {
    args: {
        as: "a",
        variant: "contained",
        children: "Link Button",
        href: "#",
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
        </div>
    ),
};
