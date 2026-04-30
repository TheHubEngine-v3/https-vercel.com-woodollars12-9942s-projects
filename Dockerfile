FROM node:20-bookworm-slim

# Install FFmpeg + fonts — locked into image so Render never has to reinstall
RUN apt-get update && apt-get install -y --no-install-recommends \
      ffmpeg \
      fonts-dejavu \
      fonts-liberation \
      fonts-noto-core \
      fontconfig \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && fc-cache -fv

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Create tmp dir for renders
RUN mkdir -p /tmp/renders

ENV PORT=10000
ENV NODE_ENV=production

EXPOSE 10000

CMD ["node", "src/server.js"]
