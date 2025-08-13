import { createCometTheme } from "@comet/admin";

export const theme = createCometTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                // @ts-expect-error - foo is not a valid prop
                foo: "bar",
            },
        },
    },
});
