# 1. Bosqich: Qurilish (Build)
FROM node:20-alpine as builder

# Environment
ENV NODE_ENV build

# Ishchi papkani belgilash
WORKDIR /home/node

# package.json va package-lock.json fayllarini nusxalash
COPY package*.json ./

# NPM paketlarini o‘rnatish
RUN npm ci

# Ilova kodini nusxalash va qurish
COPY --chown=node:node . .
RUN npm run build

# 2. Bosqich: Ishlatish (Production)
FROM node:20-alpine

# FFmpeg o‘rnatish
RUN apk update && apk add ffmpeg

# Environment
ENV NODE_ENV production

# Ishchi papkani belgilash
WORKDIR /home/node

# Qurilgan fayllarni nusxalash
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

# Dastur portini ochish
EXPOSE 8080

# Dastur ishga tushirish
CMD ["node", "dist/main.js"]