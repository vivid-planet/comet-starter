# syntax=docker/dockerfile:1

# The identity provider for the preview is dev-oidc-provider, the same one `npm run dev` starts
# locally. It is a dev dependency of the root package, so the root manifests are installed here.
# The config and the static users keep the same layout as in the repository, so that
# dev-oidc-provider.config.mts resolves them.
FROM mirror.gcr.io/library/node:24-bookworm

# Everything below runs as the unprivileged node user of the base image, during the build and at
# runtime. WORKDIR would create the directory as root, so it is created and handed over first.
RUN mkdir -p /app && chown node:node /app
WORKDIR /app
USER node

# --ignore-scripts: "npm run prepare" (husky) needs a git repository, which is not in the image.
# uid/gid: a cache mount is created for root unless it is told otherwise, and npm could not write it.
COPY --chown=node:node .npmrc package.json package-lock.json ./
RUN --mount=type=cache,target=/home/node/.npm,uid=1000,gid=1000 npm ci --ignore-scripts --no-audit --no-fund

COPY --chown=node:node api/src/auth/static-users.ts ./api/src/auth/static-users.ts
COPY --chown=node:node .deploy-preview/dev-oidc-provider.config.mts ./

EXPOSE 8080
CMD ["./node_modules/.bin/dev-oidc-provider"]
