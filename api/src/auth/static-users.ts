import { User } from "@comet/cms-api";

export const staticUsers = {
    vividPlanetEmployee: {
        id: "a19a100d-3bce-4b29-ad47-e6119d15923e",
        name: "Vivid Planet Employee",
        email: "employee@vivid-planet.com",
        language: "en",
    },
    admin: {
        id: "3b09cc12-c7e6-4d16-b858-40a822f2c548",
        name: "Admin",
        email: "admin@customer.com",
        language: "en",
    },
    editor: {
        id: "a0b13472-1ee5-4afc-8734-be661e60334f",
        name: "German Editor",
        email: "german-editor@customer.com",
        language: "en",
    },
} satisfies Record<string, User>;
