FROM node:22.7.0-alpine3.19 AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY package*json yarn.lock* package-lock.json* pnpm-lock.yaml* tsconfig.json src ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile && npm run build; \
  elif [ -f package-lock.json ]; then npm ci && npm run build && npm prune --production --ignore-scripts; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i && npm run build && pnpm prune --prod --ignore-scripts; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]