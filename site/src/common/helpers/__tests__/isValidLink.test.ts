import {
    DamFileDownloadLinkBlockData,
    EmailLinkBlockData,
    ExternalLinkBlockData,
    InternalLinkBlockData,
    PhoneLinkBlockData,
} from "@src/blocks.generated";

import { isValidLink } from "../isValidLink";

describe("isValidLink", () => {
    it("should return true for valid internal link", () => {
        const blockProps: InternalLinkBlockData = { targetPage: { id: "", name: "", path: "", documentType: "" } };
        const link = { block: { type: "internal", props: blockProps }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(true);
    });

    it("should return false for invalid internal link", () => {
        const link = { block: { type: "internal", props: {} }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(false);
    });

    it("should return true for valid external link", () => {
        const blockProps: ExternalLinkBlockData = { targetUrl: "http://example.com", openInNewWindow: false };
        const link = {
            block: { type: "external", props: blockProps },
            attachedBlocks: [],
        };

        expect(isValidLink(link)).toBe(true);
    });

    it("should return false for invalid external link", () => {
        const link = { block: { type: "external", props: {} }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(false);
    });

    it("should return true for valid damFileDownload link", () => {
        const blockProps: DamFileDownloadLinkBlockData = { openFileType: "Download", file: { id: "", name: "", fileUrl: "", size: 0 } };
        const link = { block: { type: "damFileDownload", props: blockProps }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(true);
    });

    it("should return false for invalid damFileDownload link", () => {
        const link = { block: { type: "damFileDownload", props: {} }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(false);
    });

    it("should return true for valid email link", () => {
        const blockProps: EmailLinkBlockData = { email: "foo@mail.com" };
        const link = { block: { type: "email", props: blockProps }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(true);
    });

    it("should return false for invalid email link", () => {
        const link = { block: { type: "email", props: {} }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(false);
    });

    it("should return true for valid phone link", () => {
        const blockProps: PhoneLinkBlockData = { phone: "1234567890" };
        const link = { block: { type: "phone", props: blockProps }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(true);
    });

    it("should return false for invalid phone link", () => {
        const link = { block: { type: "phone", props: {} }, attachedBlocks: [] };

        expect(isValidLink(link)).toBe(false);
    });
});
