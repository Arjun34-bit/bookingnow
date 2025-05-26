# How to Run via DOCKER and its Commands ?

```bash
docker-compose up -d build # build's each service and runs each service in detached mode

#Logs Checking
docker-compose logs -f server
docker-compose logs -f payment-service
docker-compose logs -f notification-service


#Stop All Services
docker-compose down

#Restart the service
docker-compose restart notification-service

```
