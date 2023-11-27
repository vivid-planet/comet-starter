/* eslint-disable @typescript-eslint/naming-convention */
import { BlobStorageConfig } from "@comet/cms-api";
import { Transform, Type } from "class-transformer";
import { IsBase64, IsBoolean, IsInt, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";

export class EnvironmentVariables {
    @IsString()
    @ValidateIf(() => process.env.NODE_ENV === "production")
    HELM_RELEASE: string;

    @IsString()
    POSTGRESQL_HOST: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true")
    POSTGRESQL_USE_SSL: boolean;

    @Type(() => Number)
    @IsInt()
    POSTGRESQL_PORT: number;

    @IsString()
    POSTGRESQL_DB: string;

    @IsOptional()
    @IsString()
    POSTGRESQL_USER?: string;

    @IsBase64()
    POSTGRESQL_PWD: string;

    @IsString()
    API_URL: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true")
    USE_AUTHPROXY: boolean;

    @IsString()
    @ValidateIf((v) => v.USE_AUTHPROXY === "true")
    BASIC_AUTH_PASSWORD: string;

    @IsString()
    @ValidateIf((v) => v.USE_AUTHPROXY === "true")
    IDP_JWKS_URI: string;

    @IsString()
    @ValidateIf((v) => v.USE_AUTHPROXY === "true")
    IDP_END_SESSION_ENDPOINT: string;

    @IsString()
    @ValidateIf((v) => v.USE_AUTHPROXY === "true")
    POST_LOGOUT_REDIRECT_URI: string;

    @Type(() => Number)
    @IsInt()
    API_PORT: number;

    @IsString()
    CORS_ALLOWED_ORIGIN: string;

    @IsString()
    IMGPROXY_SALT: string;

    @IsString()
    IMGPROXY_URL: string;

    @IsString()
    IMGPROXY_KEY: string;

    @IsString()
    @MinLength(16)
    DAM_SECRET: string;

    @IsString()
    BLOB_STORAGE_DRIVER: BlobStorageConfig["backend"]["driver"];

    @ValidateIf((v) => v.BLOB_STORAGE_DRIVER === "file")
    @IsString()
    FILE_STORAGE_PATH: string;

    @ValidateIf((v) => v.BLOB_STORAGE_DRIVER === "azure")
    @IsString()
    AZURE_ACCOUNT_NAME: string;

    @ValidateIf((v) => v.BLOB_STORAGE_DRIVER === "azure")
    @IsString()
    AZURE_ACCOUNT_KEY: string;

    @IsString()
    BLOB_STORAGE_DIRECTORY_PREFIX: string;

    @ValidateIf((v) => v.DAM_STORAGE_DRIVER === "s3")
    @IsString()
    S3_REGION: string;

    @ValidateIf((v) => v.DAM_STORAGE_DRIVER === "s3")
    @IsString()
    S3_ENDPOINT: string;

    @ValidateIf((v) => v.DAM_STORAGE_DRIVER === "s3")
    @IsString()
    S3_BUCKET: string;

    @ValidateIf((v) => v.DAM_STORAGE_DRIVER === "s3")
    @IsString()
    S3_ACCESS_KEY_ID: string;

    @ValidateIf((v) => v.DAM_STORAGE_DRIVER === "s3")
    @IsString()
    S3_SECRET_ACCESS_KEY: string;
}
