// TODO theme
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Theme {}

const theme: Theme = {};

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends Theme {}
}

export { theme };
