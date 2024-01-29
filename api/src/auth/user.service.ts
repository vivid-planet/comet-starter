import { FindUsersArgs, User, UserPermissionsUserServiceInterface, Users } from "@comet/cms-api";
import { Injectable } from "@nestjs/common";

export const staticUser: User = {
    id: "10f266b8-ec2e-4a0c-98ec-2cfacceda1b7",
    name: "Test Admin",
    email: "demo@comet-dxp.com",
    language: "en",
};

@Injectable()
export class UserService implements UserPermissionsUserServiceInterface {
    getUser(id: string): User {
        // TODO adapt to your needs
        return staticUser;
    }
    findUsers(args: FindUsersArgs): Users {
        // TODO adapt to your needs
        return [[staticUser], 1];
    }
}
