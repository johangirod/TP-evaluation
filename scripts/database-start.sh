docker network create TP-eval
docker run -d \
    --name mysql \
    --network TP-eval --network-alias mysql \
    -v TP-eval-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=randotarn \
    mysql:8.0
