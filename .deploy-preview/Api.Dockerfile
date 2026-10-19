# syntax=docker/dockerfile:1

FROM mirror.gcr.io/library/node:24-bookworm

# Everything below runs as the unprivileged node user of the base image, during the build and at
# runtime. WORKDIR would create the directory as root, so it is created and handed over first.
RUN mkdir -p /app/api && chown node:node /app/api
WORKDIR /app/api
USER node

# The manifests are copied on their own, so that a source change does not invalidate the install.
COPY --chown=node:node .npmrc ./
COPY --chown=node:node api/package.json api/package-lock.json ./
# uid/gid: a cache mount is created for root unless it is told otherwise, and npm could not write it.
RUN --mount=type=cache,target=/home/node/.npm,uid=1000,gid=1000 npm ci --no-audit --no-fund

COPY --chown=node:node api ./
COPY --chown=node:node site-configs/site-configs.d.ts ./src/site-configs.d.ts
# The prebuild script runs the api-generator.
RUN npm run build

# Blob storage of the api (FILE_STORAGE_PATH=uploads), shared with imgproxy through a volume.
# Created here, so that a fresh volume inherits the ownership of the node user.
RUN mkdir -p uploads

COPY --chown=node:node .deploy-preview/api-start.sh /api-start.sh
ENV NODE_ENV=production
EXPOSE 4000
CMD ["/api-start.sh"]
