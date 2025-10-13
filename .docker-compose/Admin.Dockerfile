FROM registry.access.redhat.com/ubi9/nodejs-22:latest

USER 1001

COPY --chown=1001:0 ./ ./
COPY --from=api ./block-meta.json ./block-meta.json
COPY --from=api ./schema.gql ./schema.gql
COPY --from=api ./src/comet-config.json ./src/comet-config.json

RUN ./intl-update.sh && \
    npm ci --strict-peer-deps && \
    npm run build && \
    rm -rf ./node_modules

CMD "node" "server"
