import { PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { DamVideoBlockData } from "@src/blocks.generated";
import * as React from "react";
import styled from "styled-components";

export const DamVideoBlock = withPreview(
    ({ data: { damFile, autoplay, showControls } }: PropsWithData<DamVideoBlockData>) => {
        if (damFile === undefined) {
            return <PreviewSkeleton type="media" hasContent={false} />;
        }

        const [showPreview, setShowPreview] = React.useState(true);

        const previewImage = (
            <PreviewImage
                onClick={() => setShowPreview(false)}
                src={"https://t4.ftcdn.net/jpg/01/30/32/55/360_F_130325555_gIxLj6dj2NxDILdJEMHMmBsPL4tHCEej.jpg"}
            />
        );

        return (
            <Wrapper>
                4:3 Aspect Ratio
                <VideoContainer>
                    {showPreview && previewImage}
                    <Video4x3 autoPlay={autoplay} controls={showControls} playsInline muted={autoplay}>
                        <source src={damFile.fileUrl} type={damFile.mimetype} />
                    </Video4x3>
                </VideoContainer>
                <Spacer />
                16:9 Aspect Ratio
                <VideoContainer>
                    {showPreview && previewImage}
                    <Video16x9 autoPlay={autoplay} controls={showControls} playsInline muted={autoplay}>
                        <source src={damFile.fileUrl} type={damFile.mimetype} />
                    </Video16x9>
                </VideoContainer>
                <Spacer />
                3:2 Aspect Ratio
                <VideoContainer>
                    {showPreview && previewImage}
                    <Video3x2 autoPlay={autoplay} controls={showControls} playsInline muted={autoplay}>
                        <source src={damFile.fileUrl} type={damFile.mimetype} />
                    </Video3x2>
                </VideoContainer>
            </Wrapper>
        );
    },
    { label: "Video" },
);

const VideoContainer = styled.div`
    position: relative;
`;

const PreviewImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    object-fit: cover;
`;

const Video4x3 = styled.video`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 4 / 3;
`;

const Spacer = styled.div`
    height: 50px;
    width: 100%;
`;

const Video16x9 = styled.video`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 9;
`;

const Video3x2 = styled.video`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 3 / 2;
`;

const Wrapper = styled.div`
    width: 80%;
    margin: auto;
    background-color: bisque;
`;
