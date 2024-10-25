import { render } from "@testing-library/react";

const usePreview = jest.fn();

jest.mock("@comet/cms-site", () => {
    return {
        usePreview: () => usePreview(),
    };
});

import { HiddenIfInvalidLink } from "../HiddenIfInvalidLink";

describe("HiddenIfInvalidLink", () => {
    it("should render children if previewType is BlockPreview", () => {
        usePreview.mockReturnValue({ previewType: "BlockPreview" });

        const { getByText } = render(
            <HiddenIfInvalidLink link={{ block: { type: "internal", props: {} }, attachedBlocks: [] }}>
                <div>Valid Link</div>
            </HiddenIfInvalidLink>,
        );

        expect(getByText("Valid Link")).toBeInTheDocument();
    });

    it("should render children if link is valid", () => {
        usePreview.mockReturnValue({ previewType: "OtherPreview" });

        const validLink = {
            block: { type: "internal", props: { targetPage: { id: "", name: "", path: "", documentType: "" } } },
            attachedBlocks: [],
        };
        const { getByText } = render(
            <HiddenIfInvalidLink link={validLink}>
                <div>Valid Link</div>
            </HiddenIfInvalidLink>,
        );

        expect(getByText("Valid Link")).toBeInTheDocument();
    });

    it("should not render children if link is invalid", () => {
        usePreview.mockReturnValue({ previewType: "OtherPreview" });
        const invalidLink = { block: { type: "internal", props: {} }, attachedBlocks: [] };
        const { queryByText } = render(
            <HiddenIfInvalidLink link={invalidLink}>
                <div>Invalid Link</div>
            </HiddenIfInvalidLink>,
        );

        expect(queryByText("Invalid Link")).toBeNull();
    });
});
