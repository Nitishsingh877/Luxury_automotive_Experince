# Luxury Automotive Experience App 

Complete Java Spring Boot microservices backend implementation for a luxury automotive experience application.

## Architecture Overview

This project implements a microservices architecture with the following services:

1. **eureka-server** (Port 8761) - Service Discovery
2. **gateway-service** (Port 8080) - API Gateway with JWT Security
3. **authentication-service** (Port 8081) - User Authentication & JWT Generation
4. **vehicle-catalog-service** (Port 8082) - Vehicle Management & Configurator
5. **appointment-service** (Port 8083) - Dealership & Appointment Management
6. **ownership-service** (Port 8084) - Vehicle Ownership Dashboard
7. **payment-service** (Port 8085) - Razorpay Payment Integration
8. **reporting-service** (Port 8086) - RabbitMQ Consumer for Notifications

## Technology Stack

- **Java 17**
- **Spring Boot 3.1.5**
- **Spring Cloud 2022.0.4**
- **MySQL** - Database
- **RabbitMQ** - Asynchronous Messaging
- **Razorpay** - Payment Gateway
- **Feign Client** - Synchronous Service Communication
- **JWT** - Authentication & Authorization
- **Swagger/OpenAPI** - API Documentation
- **Eureka** - Service Discovery
- **Spring Cloud Gateway** - API Gateway

## Prerequisites

Before running the application, ensure you have:

1. **JDK 17** or higher installed
2. **Maven 3.6+** installed
3. **MySQL 8.0+** running on localhost:3306
   - Username: root
   - Password: root
4. **RabbitMQ** running on localhost:5672
   - Username: guest
   - Password: guest
5. **Razorpay Account** (for payment-service)
   - Update `razorpay.key.id` and `razorpay.key.secret` in payment-service/application.yml

## Database Setup

Create the following databases in MySQL:

```sql
CREATE DATABASE auth_db;
CREATE DATABASE catalog_db;
CREATE DATABASE appointment_db;
CREATE DATABASE ownership_db;
CREATE DATABASE payment_db;
```

## Running the Services

Start the services in the following order:

### 1. Start Eureka Server
```bash
cd eureka-server
mvn clean install
mvn spring-boot:run
```
Access Eureka Dashboard: http://localhost:8761

### 2. Start Gateway Service
```bash
cd gateway-service
mvn clean install
mvn spring-boot:run
```

### 3. Start Authentication Service
```bash
cd authentication-service
mvn clean install
mvn spring-boot:run
```

### 4. Start Vehicle Catalog Service
```bash
cd vehicle-catalog-service
mvn clean install
mvn spring-boot:run
```

### 5. Start Appointment Service
```bash
cd appointment-service
mvn clean install
mvn spring-boot:run
```

### 6. Start Ownership Service
```bash
cd ownership-service
mvn clean install
mvn spring-boot:run
```

### 7. Start Payment Service
```bash
cd payment-service
mvn clean install
mvn spring-boot:run
```

### 8. Start Reporting Service
```bash
cd reporting-service
mvn clean install
mvn spring-boot:run
```

## API Documentation

Access Swagger UI for each service:

- **Gateway Aggregated Docs**: http://localhost:8080/swagger-ui.html
- **Authentication Service**: http://localhost:8081/swagger-ui.html
- **Vehicle Catalog Service**: http://localhost:8082/swagger-ui.html
- **Appointment Service**: http://localhost:8083/swagger-ui.html
- **Ownership Service**: http://localhost:8084/swagger-ui.html
- **Payment Service**: http://localhost:8085/swagger-ui.html

## API Endpoints

### Authentication Service (via Gateway: http://localhost:8080)

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "testuser",
  "email": "test@example.com"
}
```

### Vehicle Catalog Service

#### Get All Vehicles
```bash
GET /api/catalog
Authorization: Bearer <token>
```

#### Get Vehicle by ID
```bash
GET /api/catalog/{id}
Authorization: Bearer <token>
```

#### Search Vehicles
```bash
GET /api/catalog/search?modelName=Sedan
Authorization: Bearer <token>
```

#### Calculate Price
```bash
POST /api/catalog/price
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicleId": 1,
  "exteriorColor": "Obsidian Black",
  "interiorTrim": "Black Leather",
  "additionalFeatures": ["Sport Package", "Premium Audio"]
}
```

### Appointment Service

#### Get All Dealerships
```bash
GET /api/appointments/dealerships
Authorization: Bearer <token>
```

#### Search Dealerships
```bash
GET /api/appointments/dealerships/search?location=New York
Authorization: Bearer <token>
```

#### Book Appointment
```bash
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "dealershipId": 1,
  "serviceType": "Test Drive",
  "date": "2024-12-25T10:00:00"
}
```

### Ownership Service

#### Get User's Vehicles
```bash
GET /api/ownership/user/{userId}
Authorization: Bearer <token>
```

#### Add Owned Vehicle
```bash
POST /api/ownership
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "vehicleId": 1,
  "currentMileage": 5000,
  "serviceHistory": "[{\"date\":\"2024-01-15\",\"service\":\"Oil Change\",\"cost\":150}]",
  "upcomingMaintenance": "Next service at 10,000 miles"
}
```

### Payment Service

#### Create Payment Order
```bash
POST /api/payments/create-order
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "appointmentId": 1,
  "amount": 500.00
}
```

#### Verify Payment
```bash
POST /api/payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature_xxx"
}
```

## Key Features Implemented

### 1. Microservices Architecture
- 8 independent, scalable services
- Service discovery with Eureka
- API Gateway for unified entry point

### 2. Security
- JWT-based authentication
- Gateway-level security filter
- Protected endpoints (except /api/auth/**)

### 3. Database
- MySQL for persistent storage
- JPA/Hibernate for ORM
- Initial data seeding via data.sql

### 4. Inter-Service Communication
- **Synchronous**: Feign Client (ownership-service → vehicle-catalog-service)
- **Asynchronous**: RabbitMQ (appointment-service → reporting-service)

### 5. Payment Integration
- Razorpay integration for test payments
- Order creation and verification
- Payment tracking

### 6. API Documentation
- Swagger/OpenAPI integration
- Interactive API testing
- Comprehensive endpoint documentation

## Testing the Application

### 1. Register and Login
```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@test.com","password":"pass123"}'

# Login (save the token)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'
```

### 2. Access Protected Endpoints
```bash
# Get vehicles (use token from login)
curl -X GET http://localhost:8080/api/catalog \
  -H "Authorization: Bearer <your-token>"
```

### 3. Test Feign Client
```bash
# Get user's vehicles (will fetch vehicle details via Feign)
curl -X GET http://localhost:8080/api/ownership/user/1 \
  -H "Authorization: Bearer <your-token>"
```

### 4. Test RabbitMQ
```bash
# Book an appointment (check reporting-service logs for notification)
curl -X POST http://localhost:8080/api/appointments \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"dealershipId":1,"serviceType":"Service","date":"2024-12-25T10:00:00"}'
```

## Project Structure

```
luxury-automotive-backend/
├── eureka-server/
├── gateway-service/
├── authentication-service/
├── vehicle-catalog-service/
├── appointment-service/
├── ownership-service/
├── payment-service/
├── reporting-service/
└── README.md
```

## Default Test Credentials

**Users** (password: "password"):
- Username: john_doe, Email: john@example.com
- Username: jane_smith, Email: jane@example.com

## Troubleshooting

### Services not registering with Eureka
- Ensure Eureka server is running first
- Check network connectivity
- Verify eureka.client.service-url.defaultZone in application.yml

### JWT Authentication Failing
- Ensure JWT secret is same in authentication-service and gateway-service
- Check token expiration (default: 24 hours)
- Verify Authorization header format: "Bearer <token>"

### RabbitMQ Connection Issues
- Ensure RabbitMQ is running: `rabbitmq-server`
- Check credentials (default: guest/guest)
- Verify port 5672 is accessible

### MySQL Connection Issues
- Ensure MySQL is running
- Verify credentials (root/root)
- Check if databases are created

## Production Considerations

1. **Security**
   - Use environment variables for sensitive data
   - Implement rate limiting
   - Add CORS configuration
   - Use HTTPS

2. **Database**
   - Use connection pooling
   - Implement database migrations (Flyway/Liquibase)
   - Set up read replicas

3. **Monitoring**
   - Add Spring Boot Actuator
   - Implement distributed tracing (Zipkin/Sleuth)
   - Set up logging aggregation (ELK Stack)

4. **Deployment**
   - Containerize with Docker
   - Use Kubernetes for orchestration
   - Implement CI/CD pipeline

## License

This project is for educational purposes.

## Support

For issues or questions, please refer to the API documentation or check service logs.
