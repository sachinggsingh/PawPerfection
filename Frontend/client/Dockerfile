FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Start the Vite development server on 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
