# Luxury Automotive Experience App - Architecture Documentation

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Applications                      │
│                    (Web, Mobile, Desktop)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway (Port 8080)                       │
│                  - JWT Authentication Filter                     │
│                  - Request Routing                               │
│                  - Load Balancing                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Eureka Service Discovery (Port 8761)                │
│                  - Service Registration                          │
│                  - Service Discovery                             │
└─────────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Auth Service │    │Vehicle Catalog│   │ Appointment  │
│  (Port 8081) │    │  (Port 8082)  │   │  (Port 8083) │
│              │    │               │   │              │
│ - JWT Gen    │    │ - CRUD Ops    │   │ - Dealerships│
│ - User Mgmt  │    │ - Search      │   │ - Bookings   │
│              │    │ - Pricing     │   │ - RabbitMQ   │
└──────────────┘    └──────────────┘   └──────┬───────┘
                            ▲                   │
                            │                   │ RabbitMQ
                            │ Feign Client      │ Producer
                            │                   │
        ┌───────────────────┴───────┐          │
        │                           │          │
        ▼                           ▼          ▼
┌──────────────┐            ┌──────────────┐  ┌──────────────┐
│  Ownership   │            │   Payment    │  │  Reporting   │
│  (Port 8084) │            │ (Port 8085)  │  │ (Port 8086)  │
│              │            │              │  │              │
│ - My Garage  │            │ - Razorpay   │  │ - RabbitMQ   │
│ - Feign Call │            │ - Orders     │  │   Consumer   │
│              │            │ - Verify     │  │ - Logging    │
└──────────────┘            └──────────────┘  └──────────────┘
        │                           │
        ▼                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MySQL Databases                          │
│  auth_db | catalog_db | appointment_db | ownership_db | payment_db│
└─────────────────────────────────────────────────────────────────┘
```

## Service Details

### 1. Eureka Server (Port 8761)
**Purpose**: Service Discovery and Registration

**Key Features**:
- Central registry for all microservices
- Health monitoring
- Load balancing support
- Service instance management

**Dependencies**: None (standalone)

---

### 2. Gateway Service (Port 8080)
**Purpose**: API Gateway and Security Layer

**Key Features**:
- Single entry point for all client requests
- JWT token validation
- Request routing to appropriate services
- Load balancing via Eureka
- Aggregated Swagger documentation

**Security**:
- Public endpoints: `/api/auth/**`
- Protected endpoints: All others require JWT token

**Routes**:
```
/api/auth/**        → authentication-service
/api/catalog/**     → vehicle-catalog-service
/api/appointments/** → appointment-service
/api/ownership/**   → ownership-service
/api/payments/**    → payment-service
```

---

### 3. Authentication Service (Port 8081)
**Purpose**: User Authentication and Authorization

**Database**: auth_db

**Entities**:
- User (id, username, email, password, role)

**Key Features**:
- User registration
- User login
- JWT token generation
- Password encryption (BCrypt)
- Token validation endpoint

**Endpoints**:
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login and get JWT
- GET `/api/auth/validate` - Validate token

---

### 4. Vehicle Catalog Service (Port 8082)
**Purpose**: Vehicle Management and Configuration

**Database**: catalog_db

**Entities**:
- Vehicle (id, modelName, basePrice, specs, features, exteriorColors, interiorTrims)

**Key Features**:
- CRUD operations for vehicles
- Search by model name
- Filter by price range
- Dynamic price calculation based on customization
- Support for vehicle configurator

**Endpoints**:
- GET `/api/catalog` - Get all vehicles
- GET `/api/catalog/{id}` - Get vehicle by ID
- POST `/api/catalog` - Create vehicle
- PUT `/api/catalog/{id}` - Update vehicle
- DELETE `/api/catalog/{id}` - Delete vehicle
- GET `/api/catalog/search` - Search vehicles
- GET `/api/catalog/filter` - Filter by price
- POST `/api/catalog/price` - Calculate custom price

**Pricing Logic**:
- Base price from vehicle
- Exterior color: +$2,000
- Interior trim: +$3,000
- Additional features: +$1,500 each

---

### 5. Appointment Service (Port 8083)
**Purpose**: Dealership Management and Appointment Booking

**Database**: appointment_db

**Entities**:
- Dealership (id, name, address, servicesOffered, operatingHours)
- Appointment (id, userId, dealershipId, serviceType, date, status)

**Key Features**:
- Dealership locator
- Search dealerships by location
- Book appointments
- View user appointments
- RabbitMQ integration for notifications

**Endpoints**:
- GET `/api/appointments/dealerships` - Get all dealerships
- GET `/api/appointments/dealerships/{id}` - Get dealership by ID
- GET `/api/appointments/dealerships/search` - Search by location
- POST `/api/appointments` - Book appointment
- GET `/api/appointments/user/{userId}` - Get user appointments
- GET `/api/appointments/{id}` - Get appointment by ID

**RabbitMQ Integration**:
- **Producer**: Sends notification when appointment is booked
- **Exchange**: appointment-exchange (Topic)
- **Routing Key**: appointment.created
- **Queue**: appointment-notifications

---

### 6. Ownership Service (Port 8084)
**Purpose**: Vehicle Ownership Management

**Database**: ownership_db

**Entities**:
- OwnedVehicle (id, userId, vehicleId, currentMileage, serviceHistory, upcomingMaintenance)

**Key Features**:
- My Garage dashboard
- Track owned vehicles
- Service history tracking
- Mileage updates
- Feign Client integration to fetch vehicle details

**Endpoints**:
- GET `/api/ownership/user/{userId}` - Get user's vehicles with details
- GET `/api/ownership/{id}` - Get owned vehicle by ID
- POST `/api/ownership` - Add owned vehicle
- PATCH `/api/ownership/{id}/mileage` - Update mileage

**Feign Client Integration**:
- Calls `vehicle-catalog-service` to enrich owned vehicle data
- Synchronous communication
- Fetches complete vehicle details (model, specs, features)

---

### 7. Payment Service (Port 8085)
**Purpose**: Payment Processing

**Database**: payment_db

**Entities**:
- Payment (id, razorpayOrderId, razorpayPaymentId, userId, appointmentId, amount, currency, status, createdAt)

**Key Features**:
- Razorpay integration
- Create payment orders
- Verify payment signatures
- Track payment status
- Support for appointment deposits

**Endpoints**:
- POST `/api/payments/create-order` - Create Razorpay order
- POST `/api/payments/verify` - Verify payment
- GET `/api/payments/{id}` - Get payment by ID

**Razorpay Integration**:
- Test mode configuration
- Order creation with amount in paise
- Signature verification for security
- Payment status tracking

---

### 8. Reporting Service (Port 8086)
**Purpose**: Notification Processing and Reporting

**Database**: None (stateless consumer)

**Key Features**:
- RabbitMQ consumer
- Process appointment notifications
- Log events
- Can be extended for email/SMS notifications

**RabbitMQ Integration**:
- **Consumer**: Listens to appointment-notifications queue
- **Processing**: Logs appointment details
- **Extensible**: Can add email, SMS, analytics

---

## Communication Patterns

### Synchronous Communication (Feign Client)

**Use Case**: Ownership Service → Vehicle Catalog Service

```
┌──────────────────┐         Feign Client         ┌──────────────────┐
│ Ownership Service│ ─────────────────────────────▶│ Catalog Service  │
│                  │  GET /api/catalog/{id}        │                  │
│  Needs vehicle   │ ◀─────────────────────────────│  Returns vehicle │
│  details         │      Vehicle DTO              │  details         │
└──────────────────┘                               └──────────────────┘
```

**Benefits**:
- Real-time data
- Strong consistency
- Direct response

---

### Asynchronous Communication (RabbitMQ)

**Use Case**: Appointment Service → Reporting Service

```
┌──────────────────┐                               ┌──────────────────┐
│Appointment Service│                               │Reporting Service │
│                  │                               │                  │
│  Book Appointment│                               │                  │
│       ↓          │                               │                  │
│  Save to DB      │                               │                  │
│       ↓          │                               │                  │
│  Publish Event   │──────────────────────────────▶│  @RabbitListener │
│                  │   RabbitMQ Queue              │       ↓          │
│  Return Response │                               │  Process Event   │
│                  │                               │       ↓          │
│                  │                               │  Log/Notify      │
└──────────────────┘                               └──────────────────┘
```

**Benefits**:
- Decoupled services
- Asynchronous processing
- Scalability
- Fault tolerance

---

## Security Architecture

### JWT Authentication Flow

```
1. User Registration/Login
   ┌──────┐                    ┌──────────────┐
   │Client│───Register/Login──▶│Auth Service  │
   └──────┘                    │              │
                               │ Generate JWT │
                               └──────┬───────┘
                                      │
                                      ▼
   ┌──────┐                    ┌──────────────┐
   │Client│◀────JWT Token──────│Auth Service  │
   └──────┘                    └──────────────┘

2. Accessing Protected Resources
   ┌──────┐                    ┌──────────────┐
   │Client│──Request + JWT────▶│API Gateway   │
   └──────┘                    │              │
                               │ Validate JWT │
                               └──────┬───────┘
                                      │ Valid
                                      ▼
                               ┌──────────────┐
                               │Target Service│
                               │              │
                               │Process Request│
                               └──────┬───────┘
                                      │
                                      ▼
   ┌──────┐                    ┌──────────────┐
   │Client│◀────Response───────│Target Service│
   └──────┘                    └──────────────┘
```

**JWT Token Structure**:
```json
{
  "sub": "username",
  "userId": 1,
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Security Features**:
- HS256 algorithm
- Secret key: Shared between auth-service and gateway
- 24-hour expiration
- Bearer token format

---

## Database Schema

### auth_db
```sql
users
├── id (PK, AUTO_INCREMENT)
├── username (UNIQUE, NOT NULL)
├── email (UNIQUE, NOT NULL)
├── password (NOT NULL, BCrypt)
└── role (NOT NULL, DEFAULT 'USER')
```

### catalog_db
```sql
vehicle
├── id (PK, AUTO_INCREMENT)
├── model_name (NOT NULL)
├── base_price (NOT NULL)
├── specs (TEXT)
├── features (TEXT)
├── exterior_colors (JSON as TEXT)
└── interior_trims (JSON as TEXT)
```

### appointment_db
```sql
dealership
├── id (PK, AUTO_INCREMENT)
├── name (NOT NULL)
├── address (NOT NULL)
├── services_offered (TEXT)
└── operating_hours (TEXT)

appointment
├── id (PK, AUTO_INCREMENT)
├── user_id (NOT NULL)
├── dealership_id (NOT NULL)
├── service_type (NOT NULL)
├── date (NOT NULL)
└── status (NOT NULL, DEFAULT 'PENDING')
```

### ownership_db
```sql
owned_vehicle
├── id (PK, AUTO_INCREMENT)
├── user_id (NOT NULL)
├── vehicle_id (NOT NULL, FK to catalog.vehicle)
├── current_mileage (NOT NULL)
├── service_history (JSON as TEXT)
└── upcoming_maintenance (TEXT)
```

### payment_db
```sql
payment
├── id (PK, AUTO_INCREMENT)
├── razorpay_order_id (NOT NULL)
├── razorpay_payment_id
├── user_id (NOT NULL)
├── appointment_id (NOT NULL)
├── amount (NOT NULL)
├── currency (NOT NULL, DEFAULT 'INR')
├── status (NOT NULL, DEFAULT 'CREATED')
└── created_at (NOT NULL)
```

---

## Scalability Considerations

### Horizontal Scaling
- All services are stateless (except databases)
- Multiple instances can run behind load balancer
- Eureka handles service discovery for multiple instances

### Database Scaling
- Read replicas for read-heavy operations
- Sharding for large datasets
- Connection pooling

### Message Queue Scaling
- RabbitMQ clustering
- Multiple consumers for parallel processing
- Dead letter queues for failed messages

---

## Monitoring and Observability

### Recommended Tools
1. **Spring Boot Actuator** - Health checks, metrics
2. **Prometheus** - Metrics collection
3. **Grafana** - Metrics visualization
4. **ELK Stack** - Log aggregation
5. **Zipkin/Sleuth** - Distributed tracing

### Health Check Endpoints
Each service exposes:
- `/actuator/health` - Service health
- `/actuator/info` - Service information
- `/actuator/metrics` - Service metrics

---

## Deployment Architecture

### Docker Deployment
```
docker-compose.yml
├── eureka-server
├── gateway-service
├── authentication-service
├── vehicle-catalog-service
├── appointment-service
├── ownership-service
├── payment-service
├── reporting-service
├── mysql
└── rabbitmq
```

### Kubernetes Deployment
```
Kubernetes Cluster
├── Namespace: luxury-automotive
├── Deployments (one per service)
├── Services (ClusterIP/LoadBalancer)
├── ConfigMaps (configuration)
├── Secrets (credentials)
├── Ingress (external access)
└── Persistent Volumes (databases)
```

---

## API Gateway Routes Summary

| Path | Service | Authentication |
|------|---------|----------------|
| `/api/auth/**` | authentication-service | Public |
| `/api/catalog/**` | vehicle-catalog-service | JWT Required |
| `/api/appointments/**` | appointment-service | JWT Required |
| `/api/ownership/**` | ownership-service | JWT Required |
| `/api/payments/**` | payment-service | JWT Required |

---

## Technology Decisions

### Why Spring Cloud Gateway?
- Reactive, non-blocking
- Better performance than Zuul
- Native Spring Cloud integration
- WebFlux support

### Why Feign Client?
- Declarative REST client
- Easy to use and maintain
- Eureka integration
- Load balancing support

### Why RabbitMQ?
- Reliable message delivery
- Multiple messaging patterns
- Easy to set up
- Good Spring AMQP support

### Why MySQL?
- ACID compliance
- Mature and stable
- Good Spring Data JPA support
- Wide community support

---

## Future Enhancements

1. **Caching Layer** - Redis for frequently accessed data
2. **API Rate Limiting** - Prevent abuse
3. **Circuit Breaker** - Resilience4j for fault tolerance
4. **Event Sourcing** - For audit trails
5. **GraphQL Gateway** - Alternative to REST
6. **Kafka Integration** - For high-throughput events
7. **Multi-tenancy** - Support multiple organizations
8. **Advanced Analytics** - Real-time dashboards

---

## Conclusion

This architecture provides a solid foundation for a scalable, maintainable luxury automotive experience application. The microservices approach allows independent development, deployment, and scaling of each service while maintaining loose coupling through well-defined APIs and messaging patterns.
