import { ChevronDown, ThreeDotSaving } from "@comet/admin-icons";
import { type ChipProps } from "@mui/material";
import { type FunctionComponent } from "react";

type ChipIconProps = {
    loading: boolean;
    onClick?: ChipProps["onClick"];
};

export const ChipIcon: FunctionComponent<ChipIconProps> = ({ loading, onClick }) => {
    if (loading) {
        return <ThreeDotSaving />;
    }
    if (onClick) {
        return <ChevronDown />;
    }

    return null;
};
