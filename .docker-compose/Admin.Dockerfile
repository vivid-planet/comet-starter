FROM registry.access.redhat.com/ubi10/nodejs-24:latest

USER 1001

# @swc/core refuses to cache its native addon in the default $HOME/.cache, since $HOME (/opt/app-root/src) is group-writable in the UBI image
ENV SWC_NATIVE_BINDING_CACHE=/tmp/swc-native-cache

COPY --chown=1001:0 ./ ./
COPY --from=api ./block-meta.json ./block-meta.json
COPY --from=api ./schema.gql ./schema.gql
COPY --from=api ./src/dextinity-config.json ./src/dextinity-config.json

RUN ./intl-update.sh && \
    npm ci && \
    npm run build && \
    rm -rf ./node_modules

CMD "node" "server"
