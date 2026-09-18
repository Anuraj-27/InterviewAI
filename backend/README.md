# AI-Based Mock Interview Platform - Spring Boot Backend

Enterprise backend for the AI Mock Interview Platform powered by Java 21, Spring Boot 3.3, and the official Google GenAI SDK (`com.google.genai`).

## Features
- **Official Google GenAI SDK (`com.google.genai`)**: Interacts directly with `gemini-2.5-flash` using structured JSON output modes.
- **RESTful Endpoints**:
  - `POST /api/interview/start`: Generates tailored, high-caliber interview questions by role and seniority level.
  - `POST /api/interview/evaluate`: Analyzes candidate answers using an objective 10-point bar-raiser rubric.
  - `GET /api/interview/health`: Health status.
- **Spring Data JPA**: Persistent interview session logs with PostgreSQL.
- **Java 21 Virtual Threads**: Enabled (`spring.threads.virtual.enabled=true`) for non-blocking I/O during AI model inference.
- **Global Error Handling**: Standardized RFC-7807 compliant error payloads with `@RestControllerAdvice`.

## Prerequisites
- Java 17 or Java 21 SDK
- Apache Maven 3.8+
- PostgreSQL (or in-memory H2 for local testing)
- Gemini API Key (`GOOGLE_API_KEY` or `GEMINI_API_KEY`)

## Quick Start

### 1. Set Environment Variables
```bash
export GOOGLE_API_KEY="your-gemini-api-key-here"
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/interview_db"
export SPRING_DATASOURCE_USERNAME="postgres"
export SPRING_DATASOURCE_PASSWORD="your-db-password"
```

### 2. Build and Run
```bash
cd backend
mvn clean package
mvn spring-boot:run
```

The server will start on port `8080` (or `3000` if configured).
