FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:latest

COPY --chown=1001:0 ./ ./
COPY --from=site-configs ./site-configs.d.ts ./src/site-configs.d.ts

RUN npm ci && \
    npm run build && \
    npm prune --omit=dev

CMD "node" "dist/main"
