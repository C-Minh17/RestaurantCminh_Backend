# Stage 1: Base image với Node.js và pnpm
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /usr/src/app

# Stage 2: Cài đặt dependencies
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 3: Build source code
FROM base AS build
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm run build
# Tối ưu: Chỉ giữ lại production dependencies
RUN pnpm prune --prod

# Stage 4: Image môi trường chạy thực tế (Production)
FROM base AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy các thư viện và code đã build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main"]
