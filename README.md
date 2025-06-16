Collecting workspace information# Arkyn Logs API Documentation

## Overview

The Arkyn Logs API is a robust solution for managing and logging HTTP traffic from multiple sources, allowing for the organization and querying of structured logs. Developed following Clean Architecture principles, the API provides a scalable framework for comprehensive HTTP log management.

## Main Features

### User Management (user)

- **User Creation**: Register new users with name, email, password and UTC settings
- **Authentication**: Login with email and password, returning JWT token
- **User List**: Get all registered users
- **User Update**: Modify information of existing users
- **User Deletion**: Remove users from the system

### Traffic Sources (trafficSource)

- **Traffic Source Creation**: Register new sources with name and domain associated with a user
- **Traffic Source List**: Get all sources associated with a user
- **Traffic Source Update**: Modify source information
- **Traffic Source Deletion**: Remove sources from the system

### Domain ... Domains\*\*: Register new domains associated with a traffic source (domain)

- **Domain Listing**: Obtain all domains from a specific source
- **Domain Deletion**: Remove domains from the system

### Paths (pathname, corePathname)

- **Path Creation**: Register new paths associated with a domain and traffic source
- **Path Listing**: Obtain all paths from a specific domain
- **Path Deletion**: Remove paths from the system

### HTTP Traffic (httpTraffic)

- **Traffic Log Creation**: Register new HTTP requests with status, method and log level
- **Traffic Log Listing**: Obtain all logs from a specific source
- **Traffic Log Deletion**: Remove logs from the system

### Core logs (coreLog)

- **Core Logging**: Logs new HTTP requests received by the traffic source
- **Core Log Listing**: Get all logs from a specific source

### Requests (request)

- **Request Creation**: Storage of headers, body and query parameters of an HTTP request
- **Traffic Association**: Linking to a specific HTTP traffic log

### Responses (response)

- **Response Creation**: Storing HTTP response headers and body
- **Traffic Association**: Linking to a specific HTTP traffic log

### Full HTTP Traffic Logs (httpTrafficRecord - view)

- **Compiling full logs**: Creating consolidated logs with domain, path, request and response information
- **Listing full logs**: Obtaining consolidated logs from a traffic source

## Architecture

The API follows Clean Architecture principles with clear separation of responsibilities between layers:

### Layers

1. **Domain (domain)**

- **Entities**: Domain objects such as User, TrafficSource, Domain, Pathname, HttpTraffic, Request, Response
- **Repositories**: Interfaces for data persistence
- **Events**: Event system for asynchronous processing
- **Views**: Domain-specific views

2. **Application (app)**

- **Use Cases**: Business rule implementations
- **Handlers**: System event handlers
- **Shared**: Shared components as event mediators

3. **Infrastructure (infra)**

- **Adapters**: Converters and utilities for interacting with external technologies
- **Controllers**: HTTP request management
- **Data**: Data access and repository implementations
- **Schemas**: Validation schemes

4. **Main (main)**

- **Config**: Application settings
- **Factory**: Factories for creating instances
- **Middlewares**: Authentication and validation logic
- **Routes**: API route definition
- **Types**: Common types used throughout the application

## Endpoints

- `/users` - User management
- `/traffic-sources` - Traffic source management
- `/domains` - Domain management
- `/pathnames` - Path management
- `/http-traffics` - Basic HTTP traffic management
- `/requests` - Request management
- `/responses` - Response management
- `/http-traffic-records` - Full traffic record management
- `/core-pathnames` - Core path management
- `/core-logs` - Core log management

## Design Patterns and Business Rules

### Clean Architecture

The API implements the Clean Architecture principles, ensuring:

- Framework independence
- Testability
- User interface independence
- Database independence
- Independence from any external agent

### SOLID

The SOLID principles are followed to ensure maintainable and extensible code:

- **S**: Single Responsibility Principle
- **O**: Open/Closed Principle
- **L**: Liskov Substitution Principle
- **I**: Interface Segregation Principle
- **D**: Dependency Inversion Principle

### Event-Driven

The application uses an event system to decouple components and allow asynchronous processing.

### Repository Pattern

Abstractions for data access are implemented through the Repository pattern, allowing:

- Easy exchange of database implementations
- Decoupling between business rules and data access
- Simpler unit tests

### Factory Pattern

Used to create complex instances, centralizing the initialization logic.

### Adapter Pattern

Implemented to convert external interfaces into interfaces compatible with the application.

## Security

- **JWT Authentication**: JSON Web Token tokens for secure authentication
- **Data Validation**: Robust validation using Zod
- **Authentication Middleware**: Restricted route protection
- **Encrypted Passwords**: Secure credential storage

## Data Model

The system uses a PostgreSQL database with the following main entities:

- **User**: System users
- **TrafficSource**: Traffic sources
- **Domain**: Domains associated with traffic sources
- **Pathname**: Paths within domains
- **HttpTraffic**: Basic HTTP traffic logs
- **Request**: Request details
- **Response**: Response details
- **CoreLog**: System core logs
- **CorePathname**: System core paths

## Additional Features

- **Event Mediator**: Event system for asynchronous processing
- **URL normalization**: Automatic URL handling to avoid duplication
- **Log Levels**: Log categorization (INFO, WARNING, FATAL)
- **Zod Validation**: Robust validation of data inputs
- **Error Handling**: Unified error handling system
- **Formatting Adapters**: Consistent formatting of dates and other data

## Development and Testing

### Available Scripts

```bash
# Development with hot reload
bun run dev

# Database migrations
bun run db:migrate
bun run db:generate
bun run db:push

# Testing
bun run test:all
bun run test:entities
```

## Technologies Used

- **Bun**: Modern JavaScript runtime and fast
- **Hono**: Lightweight and efficient web framework
- **Prisma**: ORM for database access
- **Zod**: TypeScript schema validation
- **JWT**: Token-based authentication
- **Vitest**: Fast testing framework

## License

Arkyn Logs API is licensed under the Apache 2.0 license

Copyright 2025 Lucas Gonçalves

---

This API is ideal for those who need to monitor and analyze HTTP traffic from multiple sources, offering an organized and scalable framework for log management.
