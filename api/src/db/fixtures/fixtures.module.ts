import { DependenciesModule } from "@comet/cms-api";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@src/config/config.module";
import { DamFile } from "@src/dam/entities/dam-file.entity";
import { Link } from "@src/documents/links/entities/link.entity";
import { LinksModule } from "@src/documents/links/links.module";
import { Page } from "@src/documents/pages/entities/page.entity";
import { PagesModule } from "@src/documents/pages/pages.module";
import { ConsoleModule } from "nestjs-console";

import { AccordionBlockFixtureService } from "./generators/blocks/layout/accordion-block-fixture.service";
import { ColumnsBlockFixtureService } from "./generators/blocks/layout/columns-block-fixture.service";
import { ContentGroupBlockFixtureService } from "./generators/blocks/layout/content-group-block-fixture.service";
import { SpaceBlockFixtureService } from "./generators/blocks/layout/space-block-fixture.service";
import { DamImageBlockFixtureService } from "./generators/blocks/media/dam-image-block-fixture.service";
import { DamVideoBlockFixtureService } from "./generators/blocks/media/dam-video-block-fixture.service";
import { MediaBlockFixtureService } from "./generators/blocks/media/media-block.fixture.service";
import { MediaGalleryBlockFixtureService } from "./generators/blocks/media/media-gallery-block-fixture.service";
import { PixelImageBlockFixtureService } from "./generators/blocks/media/pixel-image-block-fixture.service";
import { StandaloneMediaBlockFixtureService } from "./generators/blocks/media/standalone-media-block-fixture.service";
import { SvgImageBlockFixtureService } from "./generators/blocks/media/svg-image-block-fixture.service";
import { VimeoVideoBlockFixtureService } from "./generators/blocks/media/vimeo-video-block-fixture.service";
import { YouTubeVideoBlockFixtureService } from "./generators/blocks/media/youtube-video-block-fixture.service";
import { AnchorBlockFixtureService } from "./generators/blocks/navigation/anchor-block-fixture.service";
import { CallToActionBlockFixtureService } from "./generators/blocks/navigation/call-to-action-block-fixture.service";
import { CallToActionListBlockFixtureService } from "./generators/blocks/navigation/call-to-action-list-block.service";
import { LinkBlockFixtureService } from "./generators/blocks/navigation/link-block-fixture.service";
import { LinkListBlockFixtureService } from "./generators/blocks/navigation/link-list-block-fixture.service";
import { StandaloneCallToActionListBlockFixtureService } from "./generators/blocks/navigation/standalone-call-to-action-list-block-fixture.service";
import { TextLinkBlockFixtureService } from "./generators/blocks/navigation/text-link-block-fixture.service";
import { BasicStageBlockFixtureService } from "./generators/blocks/stage/basic-stage-block-fixture.service";
import { BillboardTeaserBlockFixtureService } from "./generators/blocks/teaser/billboard-teaser-block-fixture.service";
import { TeaserBlockFixtureService } from "./generators/blocks/teaser/teaser-block-fixture.service";
import { HeadingBlockFixtureService } from "./generators/blocks/text-and-content/heading-block-fixture.service";
import { KeyFactsBlockFixtureService } from "./generators/blocks/text-and-content/key-facts-block-fixture.service";
import { RichTextBlockFixtureService } from "./generators/blocks/text-and-content/rich-text-block-fixture.service";
import { StandaloneHeadingBlockFixtureService } from "./generators/blocks/text-and-content/standalone-heading-block-fixture.service";
import { DocumentGeneratorService } from "./generators/document-generator.service";
import { ImageFixtureService } from "./generators/image-fixture.service";
import { PageContentBlockFixtureService } from "./generators/page-content-block-fixture.service";
import { SeoBlockFixtureService } from "./generators/seo-block-fixture.service";
import { StageBlockFixtureService } from "./generators/stage-block-fixture.service";
import { VideoFixtureService } from "./generators/video-fixture.service";
import { FixturesCommand } from "./fixtures.command";

@Module({
    imports: [ConfigModule, ConsoleModule, PagesModule, LinksModule, DependenciesModule, MikroOrmModule.forFeature([DamFile, Page, Link])],
    providers: [
        AccordionBlockFixtureService,
        AnchorBlockFixtureService,
        BasicStageBlockFixtureService,
        BillboardTeaserBlockFixtureService,
        CallToActionBlockFixtureService,
        CallToActionListBlockFixtureService,
        ColumnsBlockFixtureService,
        ContentGroupBlockFixtureService,
        DamImageBlockFixtureService,
        DamVideoBlockFixtureService,
        DocumentGeneratorService,
        FixturesCommand,
        HeadingBlockFixtureService,
        ImageFixtureService,
        KeyFactsBlockFixtureService,
        LinkBlockFixtureService,
        LinkListBlockFixtureService,
        MediaGalleryBlockFixtureService,
        MediaBlockFixtureService,
        PageContentBlockFixtureService,
        PixelImageBlockFixtureService,
        RichTextBlockFixtureService,
        SeoBlockFixtureService,
        SpaceBlockFixtureService,
        StageBlockFixtureService,
        SvgImageBlockFixtureService,
        StageBlockFixtureService,
        StandaloneCallToActionListBlockFixtureService,
        StandaloneHeadingBlockFixtureService,
        StandaloneMediaBlockFixtureService,
        TeaserBlockFixtureService,
        TextLinkBlockFixtureService,
        VideoFixtureService,
        VimeoVideoBlockFixtureService,
        YouTubeVideoBlockFixtureService,
    ],
})
export class FixturesModule {}
