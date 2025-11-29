# Atualizado para a versão 24 para bater com seu ambiente local
FROM node:24-alpine

# Habilita o corepack para usar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Cria a pasta do app
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install --frozen-lockfile

# Copia o resto do código
COPY . .

# Gera o cliente do Prisma
RUN pnpm exec prisma generate

# Faz o build do Nuxt
RUN pnpm run build

# Expõe a porta
EXPOSE 3000

# Inicia o servidor
CMD ["node", ".output/server/index.mjs"]