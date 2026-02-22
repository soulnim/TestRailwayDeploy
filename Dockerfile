# syntax=docker/dockerfile:1

# Build the Spring Boot jar inside Docker so Railway does not depend on a prebuilt local target/ folder.
FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /build

COPY pom.xml ./
COPY src ./src
RUN mvn -B -DskipTests package

# Small runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

COPY --from=builder /build/target/expensetracker-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
