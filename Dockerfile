FROM --platform=amd64 oven/bun as base

WORKDIR /app

COPY . .

# run the app
USER bun
EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "run", "index.ts" ]