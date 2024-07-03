import * as React from "react";

export interface SupportedBlocks {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (props: any) => React.ReactNode | undefined;
}

interface Props {
    supportedBlocks: SupportedBlocks;
    data: {
        blocks: Array<{ key: string; type: string; visible: boolean; props: unknown }>;
    };
}

export const BlocksBlock: React.FC<Props> = ({ supportedBlocks, data: { blocks } }: Props) => {
    if (blocks.length === 0) {
        return <></>;
    }

    return (
        <>
            {blocks.map((block) => {
                const blockFunction = supportedBlocks[block.type];

                if (!blockFunction) {
                    if (process.env.NODE_ENV === "development") {
                        return (
                            <pre key={block.key}>
                                Unknown type ({block.type}): {JSON.stringify(block.props)}
                            </pre>
                        );
                    }

                    return null;
                }

                return <React.Fragment key={block.key}>{blockFunction(block.props)}</React.Fragment>;
            })}
        </>
    );
};
