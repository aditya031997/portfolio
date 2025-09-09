# Stage 1 — build
FROM node:20-alpine AS build
WORKDIR /app

# Copy lock + package for stable installs
COPY package.json package-lock.json ./

# Install all deps (including dev for the build)
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — runtime with nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
