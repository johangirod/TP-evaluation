docker kill app
docker rm app

docker run -dp 3000:3000 \
    --network TP-eval \
    -ti \
    -e MYSQL_HOST=mysql \
    -e MYSQL_USER=root \
    -e MYSQL_PASSWORD=secret \
    -e MYSQL_DB=randotarn \
    --name app \
    -w /app --mount type=bind,src="$(pwd)",target=/app \
    node:18-alpine \
    sh -c "npm install && npm run database:init && npm run dev"

