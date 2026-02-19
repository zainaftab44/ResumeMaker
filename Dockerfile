# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install -g npm@latest && npm install


COPY . .
EXPOSE 8080
RUN npm run build

# ---- Production Stage ----
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
