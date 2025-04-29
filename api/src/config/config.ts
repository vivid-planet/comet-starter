import cometConfig from "@src/comet-config.json";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

import { EnvironmentVariables } from "./environment-variables";

export function createConfig(processEnv: NodeJS.ProcessEnv) {
    const envVars = plainToClass(EnvironmentVariables, { ...processEnv });
    const errors = validateSync(envVars, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return {
        ...cometConfig,
        debug: processEnv.NODE_ENV !== "production",
        serverHost: processEnv.SERVER_HOST ?? "localhost",
        apiUrl: envVars.API_URL,
        apiPort: envVars.API_PORT,
        corsAllowedOrigin: new RegExp(envVars.CORS_ALLOWED_ORIGIN),
        auth: {
            useAuthProxy: envVars.USE_AUTHPROXY,
            systemUserPassword: envVars.BASIC_AUTH_SYSTEM_USER_PASSWORD,
            idpClientId: envVars.IDP_CLIENT_ID,
            idpJwksUri: envVars.IDP_JWKS_URI,
            idpEndSessionEndpoint: envVars.IDP_END_SESSION_ENDPOINT,
            postLogoutRedirectUri: envVars.POST_LOGOUT_REDIRECT_URI,
        },
        acl: {
            allPermissionsEmails: envVars.ACL_ALL_PERMISSIONS_EMAILS,
            allPermissionsDomains: envVars.ACL_ALL_PERMISSIONS_DOMAINS,
        },
        imgproxy: {
            ...cometConfig.imgproxy,
            salt: envVars.IMGPROXY_SALT,
            url: envVars.IMGPROXY_URL,
            key: envVars.IMGPROXY_KEY,
        },
        dam: {
            ...cometConfig.dam,
            secret: envVars.DAM_SECRET,
            allowedImageSizes: [...cometConfig.images.imageSizes, ...cometConfig.images.deviceSizes],
        },
        blob: {
            storage: {
                driver: envVars.BLOB_STORAGE_DRIVER,
                file: {
                    path: envVars.FILE_STORAGE_PATH,
                },
                azure: {
                    accountName: envVars.AZURE_ACCOUNT_NAME,
                    accountKey: envVars.AZURE_ACCOUNT_KEY,
                },
                s3: {
                    region: envVars.S3_REGION,
                    endpoint: envVars.S3_ENDPOINT,
                    bucket: envVars.S3_BUCKET,
                    accessKeyId: envVars.S3_ACCESS_KEY_ID,
                    secretAccessKey: envVars.S3_SECRET_ACCESS_KEY,
                },
            },
            storageDirectoryPrefix: envVars.BLOB_STORAGE_DIRECTORY_PREFIX,
        },
        cdn: {
            originCheckSecret: envVars.CDN_ORIGIN_CHECK_SECRET,
        },
        siteConfigs: envVars.PRIVATE_SITE_CONFIGS,
        sitePreviewSecret: envVars.SITE_PREVIEW_SECRET,
    };
}

export type Config = ReturnType<typeof createConfig>;
