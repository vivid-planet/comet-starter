FROM registry.access.redhat.com/ubi9/nodejs-20:latest

COPY --chown=1001:0 ./ ./

RUN npm ci && \
    npm run build && \
    npm prune --omit=dev

CMD "node" "dist/main"
