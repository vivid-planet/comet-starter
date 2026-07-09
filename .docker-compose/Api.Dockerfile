FROM registry.access.redhat.com/ubi10/nodejs-24-minimal:latest

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

COPY --chown=1001:0 ./ ./
COPY --from=site-configs ./site-configs.d.ts ./src/site-configs.d.ts

RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm run build && \
    pnpm prune --prod

CMD node dist/console.js migrate && node dist/main
