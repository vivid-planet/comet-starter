import { CurrentUserInterface, CurrentUserLoaderInterface } from "@comet/cms-api";
import { Field, ObjectType } from "@nestjs/graphql";

declare module "@comet/cms-api" {
    interface CurrentUserInterface {
        domains: string[];
    }
}

@ObjectType()
export class CurrentUser implements CurrentUserInterface {
    id: string;
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    language: string;
    @Field()
    role: string;
    @Field(() => [String], { nullable: true })
    domains: string[];
}

export class CurrentUserLoader implements CurrentUserLoaderInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async load(data: any): Promise<CurrentUserInterface> {
        return {
            id: data.sub,
            name: data.name,
            email: data.email,
            language: data.language,
            role: data.role,
            domains: data.rights["domains"] ?? null,
        };
    }
}
