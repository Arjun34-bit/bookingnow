FROM node:18

WORKDIR /app

COPY package*.json ./

# Install netcat (nc) to use in the wait-for-it script
RUN apt-get update && apt-get install -y netcat-openbsd


RUN npm install

COPY . .

# Make sure the wait-for-it.sh script is executable
RUN chmod +x wait-for-it.sh

EXPOSE 5000

CMD ["npm","start"]