import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-essentials", "@storybook/addon-links", "@storybook/addon-interactions"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    viteFinal: async (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve?.alias,
                    "@src": new URL("../src", import.meta.url).pathname,
                },
            },
            css: {
                ...config.css,
                preprocessorOptions: {
                    scss: {
                        api: "modern-compiler",
                    },
                },
            },
        };
    },
};

export default config;
