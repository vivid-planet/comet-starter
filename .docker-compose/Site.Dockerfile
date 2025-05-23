FROM registry.access.redhat.com/ubi9/nodejs-22:latest

USER 1001

COPY --chown=1001:0 ./ ./
COPY --from=api ./block-meta.json ./block-meta.json
COPY --from=api ./schema.gql ./schema.gql
COPY --from=api ./src/comet-config.json ./src/comet-config.json
COPY --from=site-configs ./site-configs.d.ts ./src/site-configs.d.ts

RUN ./intl-update.sh && \
    npm ci && \
    npm run build && \
    npm prune --omit=dev

CMD "node" "dist/server"
