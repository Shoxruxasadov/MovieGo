# 1. Bosqich: Qurilish (Build)
FROM node:20-alpine as builder

ENV NODE_ENV build
WORKDIR /home/node

# package.json va package-lock.json fayllarini nusxalash
COPY package*.json ./

# Faqat build uchun kerakli barcha dependencylarni o‘rnatish
RUN npm ci

# Ilova kodini nusxalash va qurish
COPY --chown=node:node . .
RUN npm run build


# 2. Bosqich: Production
FROM node:20-alpine

# FFmpeg o‘rnatish
RUN apk update && apk add --no-cache ffmpeg

ENV NODE_ENV production
WORKDIR /home/node

# Faqat dependencies (dev emas) o‘rnatish
COPY package*.json ./
RUN npm ci --omit=dev

# Qurilgan fayllarni nusxalash
COPY --from=builder /home/node/dist ./dist

# Oddiy user sifatida ishlatish (root emas)
USER node

# Port
EXPOSE 8080

# Dastur ishga tushirish
CMD ["node", "dist/main.js"]
