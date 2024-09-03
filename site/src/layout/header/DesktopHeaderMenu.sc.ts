import { SvgUse } from "@src/common/helpers/SvgUse";
import { PageLink } from "@src/layout/header/PageLink";
import styled from "styled-components";

export const FullHeightNav = styled.nav`
    height: 100%;
    display: none;

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        display: block;
    }
`;

export const TopLevelNavigation = styled.ol`
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    gap: ${({ theme }) => theme.spacing.S600};
    height: 100%;
`;

export const SubLevelNavigation = styled.ol<{ $isExpanded: boolean }>`
    display: ${({ $isExpanded }) => ($isExpanded ? "flex" : "none")};
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.S200};
    position: absolute;
    z-index: 40;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    list-style-type: none;
    padding: ${({ theme }) => theme.spacing.D100};
    background-color: white;
    border-left: 1px solid ${({ theme }) => theme.palette.gray["200"]};
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["200"]};
    border-right: 1px solid ${({ theme }) => theme.palette.gray["200"]};
`;

export const TopLevelLinkContainer = styled.li`
    position: relative;

    &:last-child ${SubLevelNavigation} {
        left: auto;
        transform: none;
        right: 0;
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.S100};
    height: 100%;
`;

export const ToggleSubLevelNavigationButton = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    padding: 0;
    width: 20px;
    height: 20px;
`;

export const AnimatedChevron = styled(SvgUse)<{ $isExpanded: boolean }>`
    width: 100%;
    height: 100%;
    color: ${({ theme, $isExpanded }) => ($isExpanded ? theme.palette.primary.main : theme.palette.text.primary)};
    transform: rotate(${({ $isExpanded }) => ($isExpanded ? "-180deg" : "0deg")});
    transition: transform 0.4s ease;
`;

export const Link = styled(PageLink)`
    text-decoration: none;
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.S100} 0;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }

    &.active {
        text-decoration: underline ${({ theme }) => theme.palette.primary.main};
        text-underline-offset: 8px;
    }
`;
