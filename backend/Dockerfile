FROM openjdk:11-jdk-slim
VOLUME /tmp
ARG JAR_FILE=target/library-1.0-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
