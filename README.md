# Arkyn Logs API

## Overview

This API is designed to manage and log HTTP traffic from multiple sources, allowing for the organization and querying of structured logs. The API follows a clean architecture with separation of responsibilities between entities, use cases, repositories, and infrastructure layers.

## Main Features

### User Management

- **Create Users**: Register new users with name, email, password and UTC settings
- **Authenticate Users**: Login with email and password, returning JWT token
- **List Users**: Get all registered users
- **Update Users**: Modify information of existing users
- **Delete Users**: Remove users from the system

### Traffic Sources

- **Create Traffic Sources**: Register new sources with name and domain associated with a user
- **List Traffic Sources**: Get all sources associated with a user
- **Update Traffic Sources**: Modify source information
- **Delete Traffic Sources**: Remove sources from the system

### Domains

- **Create Domains**: Register new domains associated with a traffic source
- **List Domains**: Get all domains of a source specific
- **Delete Domains**: Remove domains from the system

### Paths

- **Create Paths**: Register new paths associated with a domain and traffic source
- **List Paths**: Get all paths from a specific domain
- **Delete Paths**: Remove paths from the system

### HTTP Traffic

- **Create Traffic Logs**: Log new HTTP requests with status, method and log level
- **List Traffic Logs**: Get all logs from a specific source
- **Delete Traffic Logs**: Remove logs from the system

### Requests

- **Create Requests**: Store headers, body and query params of an HTTP request
- **Associate to Traffic**: Link to a specific HTTP traffic log

### Responses

- **Create Responses**: Store headers and body of HTTP responses
- **Associate with traffic**: Link to a specific HTTP traffic log

### Complete HTTP Traffic Logs

- **Compose complete logs**: Create consolidated logs with domain, path, request and response information
- **List complete logs**: Get consolidated logs from a traffic source

## API Structure

### Endpoints

- `/users` - User management
- `/traffic-sources` - Traffic source management
- `/domains` - Domain management
- `/pathnames` - Path management
- `/http-traffics` - Basic HTTP traffic management
- `/requests` - Request management
- `/responses` - Response management
- `/http-traffic-records` - Complete traffic record management

### Architecture

The API follows a Clean Architecture with:

- **Entities**: Domain objects such as User, TrafficSource, Domain, Pathname, HttpTraffic, Request, Response
- **Use Cases**: Business rule implementations
- **Repositories**: Interfaces for data persistence
- **Adapters**: Converters and utilities for interacting with external technologies
- **Controllers**: HTTP request management
- **Middlewares**: Authentication and validation logic

## Security

- **JWT authentication**
- **Data validation** with Zod
- **Authentication middleware** for protected routes
- **Encrypted passwords**

## Data Model

The system uses a PostgreSQL database with the following entities:

- **User**: System users
- **TrafficSource**: Traffic sources
- **Domain**: Domains associated with traffic sources
- **Pathname**: Paths within domains
- **HttpTraffic**: Basic HTTP traffic records
- **Request**: Request details
- **Response**: Response details

## Additional Features

- **Event Mediator**: Event system for asynchronous processing
- **URL Normalization**: Automatic URL handling to avoid duplications
- **Log Levels**: Categorization of logs (INFO, WARNING, FATAL)
- **Zod Validation**: Robust validation of data inputs
- **Error Handling**: Unified error handling system
- **Formatting Adapters**: Consistent formatting of dates and other data

---

This API is ideal for those who need to monitor and analyze HTTP traffic from multiple sources, offering an organized and scalable framework for log management.
