/* eslint-disable @calm/react-intl/missing-formatted-message */

import "@fontsource-variable/roboto-flex/full.css";
import "@src/polyfills";

import { MuiThemeProvider as CometThemeProvider } from "@comet/admin";
import { Box, Typography } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useDefaultProps } from "@mui/system/DefaultPropsProvider";
import { theme } from "@src/theme";
import { IntlProvider } from "react-intl";

import { getMessages } from "./lang";

const Example = ({ title, color, debugRicky }: { title: string; color: string; debugRicky: string }) => {
    const defaultProps = useDefaultProps({ name: "Example", props: {} });
    console.log("### defaultProps", defaultProps); // Des is hin. Bei "Example" soid des daher kemma: `defaultProps.ctx.MuiTypography.defaultProps` (mit `foo` und `variantMapping`). `defaultProps.ctx` is aber scho `undefined`, wenn mim Comet-ThemeProvider.

    return (
        <Box sx={{ border: `5px solid ${color}`, m: 2 }}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="list">
                {/* @ts-expect-error debugRicky is not a valid prop */}
                <Typography debugRicky={debugRicky} variant="listItem">
                    UL List-Item 1
                </Typography>
                <Typography variant="listItem">UL List-Item 2</Typography>
            </Typography>
            <Typography variant="list" component="ol">
                <Typography variant="listItem">OL List-Item 1</Typography>
                <Typography variant="listItem">OL List-Item 2</Typography>
            </Typography>
        </Box>
    );
};

export function App() {
    return (
        <IntlProvider locale="en" messages={getMessages()}>
            <>
                <MuiThemeProvider theme={theme}>
                    <Example title="MUI ThemeProvider (this works)" color="magenta" debugRicky="MUI/Works" />
                </MuiThemeProvider>
                <CometThemeProvider theme={theme}>
                    <Example title="Comet ThemeProvider (this does not work)" color="lime" debugRicky="Comet/Fails" />
                </CometThemeProvider>
            </>
        </IntlProvider>
    );
}
