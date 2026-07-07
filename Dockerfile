# syntax=docker/dockerfile:1
#
# Functional-test image for the Checklist app. Builds the production client +
# server bundles, then runs the Fastify SSR server via tsx against the in-compose
# backend. Used by docker-compose.e2e.yml.

FROM node:20 AS build
WORKDIR /app
# Install deps first so this layer caches unless package*.json changes.
COPY package.json package-lock.json* ./
RUN npm ci
# .dockerignore keeps this context small (no node_modules/dist/tests/cypress).
COPY . .
RUN npm run build

FROM node:20
WORKDIR /app
ENV NODE_ENV=production
# node_modules is the big layer and only changes when deps change — copy it
# first so source-only edits reuse the cached layer and rebuilds stay fast.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
# tsx resolves the ~ path alias from tsconfig at runtime.
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/src ./src
COPY --from=build /app/routes ./routes
COPY --from=build /app/messages ./messages
COPY --from=build /app/utils ./utils
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/config.js ./config.js
COPY --from=build /app/css-loader.mjs ./css-loader.mjs
EXPOSE 3000
CMD ["npx", "tsx", "--loader", "./css-loader.mjs", "server.js"]
