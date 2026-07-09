FROM registry.access.redhat.com/ubi10/nodejs-24:latest

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable pnpm

USER 1001

COPY --chown=1001:0 ./ ./
COPY --from=api ./block-meta.json ./block-meta.json
COPY --from=api ./schema.gql ./schema.gql
COPY --from=api ./src/comet-config.json ./src/comet-config.json
COPY --from=site-configs ./site-configs.d.ts ./src/site-configs.d.ts

RUN ./intl-update.sh && \
    pnpm install --frozen-lockfile && \
    pnpm run build && \
    pnpm prune --prod

CMD "node" "dist/server"
