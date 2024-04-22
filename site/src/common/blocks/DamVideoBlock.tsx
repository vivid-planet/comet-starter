"use client";
import { PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { DamVideoBlockData } from "@src/blocks.generated";
import * as React from "react";

export const DamVideoBlock = withPreview(
    ({ data: { damFile, autoplay, showControls } }: PropsWithData<DamVideoBlockData>) => {
        if (damFile === undefined) {
            return <PreviewSkeleton type="media" hasContent={false} />;
        }

        return (
            <video autoPlay={autoplay} controls={showControls} playsInline muted={autoplay}>
                <source src={damFile.fileUrl} type={damFile.mimetype} />
            </video>
        );
    },
    { label: "Video" },
);
