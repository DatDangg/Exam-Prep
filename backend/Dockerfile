# 🧱 Stage 1: build jar
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# 🚀 Stage 2: run jar
FROM eclipse-temurin:17-jdk-jammy
COPY --from=build /app/target/*.jar app.jar
ENV JAVA_TOOL_OPTIONS="-Xmx512m"
ENTRYPOINT ["java", "-jar", "/app.jar"]
