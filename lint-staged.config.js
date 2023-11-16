module.exports = {
    "admin/**/*.{ts,tsx,js,jsx,json,css,scss,md}": () => "npm --prefix admin run lint:eslint",
    "admin/**/*.{ts,tsx}": () => "npm --prefix admin run lint:tsc",
    "api/**/*.{ts,tsx,js,jsx,json,css,scss,md}": () => "npm --prefix api run lint:eslint",
    "api/**/*.{ts,tsx}": () => "npm --prefix api run lint:tsc",
    "site/**/*.{ts,tsx,js,jsx,json,css,scss,md}": () => "npm --prefix site run lint:eslint",
    "site/**/*.{ts,tsx}": () => "npm --prefix site run lint:tsc",
    "create-app/**/*.{ts,tsx,js,jsx,json,css,scss,md}": () => "npm --prefix create-app run lint:eslint",
    "create-app/**/*.{ts,tsx}": () => "npm --prefix create-app run lint:tsc",
    "*": () => "npx prettier -c .",
};
