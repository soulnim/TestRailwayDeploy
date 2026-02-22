# Use official Java runtime as a parent image
FROM eclipse-temurin:21-jdk-jammy

# Set working directory inside container
WORKDIR /app

# Copy the built JAR into the container
COPY target/expensetracker-0.0.1-SNAPSHOT.jar app.jar

# Expose port your app runs on (Spring Boot default: 8080)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java","-jar","app.jar"]