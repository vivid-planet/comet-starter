"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import * as React from "react";
import styled from "styled-components";

import { GQLHeaderFragment } from "./Header.fragment.generated";
import { PageLink } from "./PageLink";

interface Props {
    header: GQLHeaderFragment[];
}

function Header({ header }: Props): JSX.Element {
    return (
        <Root>
            <SvgUse href="/comet-logo.svg#logo" />
            <nav>
                <TopLevelNavigation>
                    {header.map((node) => (
                        <TopLevelLinkContainer key={node.id}>
                            <PageLink page={node}>{(active) => <Link $active={active}>{node.name}</Link>}</PageLink>
                            {node.childNodes.length > 0 && (
                                <SubLevelNavigation>
                                    {node.childNodes.map((node) => (
                                        <li key={node.id}>
                                            <PageLink page={node}>{(active) => <Link $active={active}>{node.name}</Link>}</PageLink>
                                        </li>
                                    ))}
                                </SubLevelNavigation>
                            )}
                        </TopLevelLinkContainer>
                    ))}
                </TopLevelNavigation>
            </nav>
        </Root>
    );
}

const Root = styled.header`
    padding: 10px 20px;
`;

const TopLevelNavigation = styled.ol`
    display: flex;
    list-style-type: none;
    padding: 0;
`;

const SubLevelNavigation = styled.ol`
    display: none;
    position: absolute;
    min-width: 100px;
    list-style-type: none;
    padding: 5px;
    background-color: white;
    box-shadow: 0 4px 4px rgb(0 0 0 / 10%);
`;

const TopLevelLinkContainer = styled.li`
    position: relative;

    &:hover {
        text-decoration: underline;

        & > ${SubLevelNavigation} {
            display: block;
        }
    }
`;

const Link = styled.a<{ $active: boolean }>`
    text-decoration: none;
    padding: 5px 10px;

    &:hover {
        text-decoration: underline;
    }
`;

export { Header };
