# Use OpenJDK as the base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven configuration and source code
COPY pom.xml ./
COPY src ./src
COPY .mvn .mvn
COPY mvnw ./

RUN chmod +x mvnw
# Package the application
RUN ./mvnw clean package -DskipTests

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "./target/DigitalLibraryManagement-0.0.1-SNAPSHOT.jar"]
