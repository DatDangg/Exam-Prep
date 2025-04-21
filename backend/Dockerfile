FROM eclipse-temurin:17-jdk-jammy

# Copy file .jar từ thư mục target
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Giới hạn RAM để tránh crash trên Render
ENV JAVA_TOOL_OPTIONS="-Xmx512m"

# Câu lệnh để chạy app
ENTRYPOINT ["java", "-jar", "/app.jar"]
