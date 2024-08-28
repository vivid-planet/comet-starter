import { SvgUse } from "@src/common/helpers/SvgUse";
import { PageLink } from "@src/layout/header/PageLink";
import styled, { css } from "styled-components";

export const Root = styled.div`
    ${({ theme }) => css`
        ${theme.breakpoints.sm.mediaQuery} {
            display: none;
        }
    `}
`;

export const PageLayoutContent = styled.div`
    grid-column: 2 / -2;
`;

export const MenuButton = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    padding: 0;
    width: 24px;
    height: 24px;
`;

export const IconWrapper = styled.div`
    width: 16px;
    height: 16px;
    color: inherit;
`;

export const Icon = styled(SvgUse)`
    width: 100%;
    height: 100%;
    color: inherit;
`;

export const MenuContainer = styled.div<{ $isMenuOpen: boolean }>`
    display: block;
    position: fixed;
    top: 100px;
    left: 0;
    height: 0;
    width: 100vw;
    z-index: 40;
    background-color: ${({ theme }) => theme.palette.gray["200"]};
    overflow: hidden;
    visibility: hidden;
    transition: height 0.15s ease-out, visibility 0s linear 0.15s;

    ${({ $isMenuOpen }) =>
        $isMenuOpen &&
        css`
            visibility: visible;
            height: calc(100vh - 100px);
            transition: height 0.25s ease-in;
        `}
`;

export const TopLevelNavigation = styled.ol`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const SubLevelNavigation = styled.ol<{ $isExpanded: boolean }>`
    list-style-type: none;
    position: fixed;
    top: 100px;
    left: 100vw;
    height: calc(100vh - 100px);
    width: 100vw;
    z-index: 41;
    background-color: ${({ theme }) => theme.palette.gray["200"]};
    padding: 0;
    overflow: hidden;
    visibility: hidden;
    transition: left 0.15s ease-out, visibility 0s linear 0.15s;

    ${({ $isExpanded }) =>
        $isExpanded &&
        css`
            visibility: visible;
            left: 0;
            transition: left 0.25s ease-in;
        `}
`;

export const Link = styled(PageLink)`
    width: 100%;
    text-decoration: none;
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.S500} 0;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

export const ButtonLink = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: ${({ theme }) => theme.spacing.S500} 0;

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

export const BackButton = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.S200};
    width: 100%;
    padding: ${({ theme }) => theme.spacing.S500} 0;
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["300"]};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

export const OverviewButton = styled(PageLink)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.S200};
    width: 100%;
    padding: ${({ theme }) => theme.spacing.S500} 0;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;
