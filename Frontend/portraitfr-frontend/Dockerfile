# Étape 1 — Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

# Copie les variables d’environnement de prod
COPY .env.production .env.production

RUN npm install
RUN npm run build

# Étape 2 — Runtime (Next.js standalone)
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./.env.production

EXPOSE 3000

CMD ["node", "server.js"]
