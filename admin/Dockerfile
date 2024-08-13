FROM registry.access.redhat.com/ubi9/nodejs-20:latest

USER 1001

COPY --chown=1001:0 ./ ./

RUN npm ci && \
    npm run build && \
    rm -rf ./node_modules

CMD "node" "server/server"
