

为了项目的正常运行中,异常捕获,记录也是非常重要的，方便我们排查问题，定位问题

# 定义异常

为了方便定位异常，自定义了几种异常类，方便我们快速定位异常。
## 基类
```java
public class HttpException extends RuntimeException {
    protected String code;
    protected Integer httpStatusCode = 500;
}

```
## ParameterException
```java
public class ParameterException extends HttpException {
    public ParameterException(String code){
        this.code = code;
        this.httpStatusCode = 400;
    }
}
```
## ServerErrorException
```java
public class ServerErrorException extends HttpException {
    public ServerErrorException(String code) {
        this.code = code;
        this.httpStatusCode = 500;
    }
}

```
## UnAuthenticatedException
```java
public class UnAuthenticatedException extends HttpException{
    public UnAuthenticatedException(String code){
        this.code = code;
        this.httpStatusCode = 401;
    }
}

```
## ForbiddenException
```java
public class ForbiddenException extends HttpException {
    public ForbiddenException(String code) {
        this.code = code;
        this.httpStatusCode = 403;
    }
}
```
## NotFoundException
```java
public class NotFoundException extends HttpException {
    public NotFoundException(String code){
        this.httpStatusCode = 404;
        this.code = code;
    }
}

```
 这里定义了我在项目中常用的几种异常，也可根据实际情况定义自己所需的异常。
 # 捕获异常

 捕获异常需要用到一个注解`@ControllerAdvice`,关于它的详细解释可查看[文档](https://docs.spring.io/spring-framework/docs/5.0.0.M1/javadoc-api/org/springframework/web/bind/annotation/ControllerAdvice.html)。

 使用方法如下，定义一个异常捕获类

 ```java
 @ControllerAdvice
 public class GlobalExceptionAdvice {

 }
 ```
 这个类就已经实现了捕获全局异常的功能，下面在加上上面定义的几种异常
  ```java
 @ControllerAdvice
 public class GlobalExceptionAdvice {
    @ExceptionHandler(UnAuthenticatedException.class)
    public ResponseEntity unAuthenticatedException(UnAuthenticatedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getCode());
    }


    @ExceptionHandler(ParameterException.class)
    public ResponseEntity handleParameterException(ParameterException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCode());
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity handleForbiddenException(ForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getCode());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity handleNotFoundException(NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getCode());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity handleRunTimeException(RuntimeException e) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(500);
    }


 }
 ```

 `@ExceptionHandler`注解表示该方法捕获的异常类型，就可以在不同的异常中进行不同的处理方式。
 # 记录异常
  捕获到异常之后我们要记录下来，方便我们对bug的追踪解决。

  记录方法有多种多样的，比如记录到数据库或者`log`文件中。我使用了第二种方式。

  ## 加入依赖

  ```xml
     <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
       <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>1.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>2.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-jcl</artifactId>
            <version>2.2</version>
        </dependency>
  ```
  ## 增加日志配置文件

   `logback.xml`
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!-- 控制台 appender, 几乎是默认的配置 -->
    <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <encoder charset="UTF-8">
            <!-- 输出的日志文本格式, 其他的 appender 与之相同 -->
            <pattern> %d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} %L - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- info 级别的 appender -->
    <appender name="info" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 日志写入的文件名, 可以是相对目录, 也可以是绝对目录, 如果上级目录不存在会自动创建 -->
        <file>./logs/info/log-stack.log</file>
        <!-- 如果是 true, 日志被追加到文件结尾; 如果是 false, 清空现存文件. 默认是true -->
        <append>true</append>
        <!-- 日志级别过滤器, 只打 INFO 级别的日志-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <!-- 下面2个属性表示: 匹配 level 的接受打印, 不匹配的拒绝打印 -->
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <!-- 最常用的滚动策略, 它根据时间来制定滚动策略, 既负责滚动也负责触发滚动 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 设置滚动文件规则, 如果直接使用 %d, 默认格式是 yyyy-MM-dd -->
            <fileNamePattern>./logs/info/log-stack.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 保留14天的日志 -->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <!-- 定义日志输出格式 -->
        <encoder charset="UTF-8">
            <pattern> %d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} %L - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- error 级别的 appender -->
    <appender name="error" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>./logs/error/log-stack.log</file>
        <append>true</append>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>./logs/error/log-stack.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 保留7天的日志 -->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <!-- 定义日志输出格式 -->
        <encoder charset="UTF-8">
            <pattern> %d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} %L - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>
    <!-- error 级别的 appender -->
    <appender name="debug" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>./logs/debug/log-stack.log</file>
        <append>true</append>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>DEBUG</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>./logs/debug/log-stack.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 保留7天的日志 -->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <!-- 定义日志输出格式 -->
        <encoder charset="UTF-8">
            <pattern> %d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} %L - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>
    <!-- 指定 com.github 下的日志打印级别, appender -->
    <logger name="com.github" level="debug" additivity="false">
        <appender-ref ref="stdout"/>
        <appender-ref ref="info"/>
        <appender-ref ref="error"/>
        <appender-ref ref="debug"/>

    </logger>

 
    <root level="info">
        <appender-ref ref="stdout"/>
        <appender-ref ref="info"/>
        <appender-ref ref="error"/>
    </root>

</configuration>
  ```
## 写入日志
```java
@ControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {
    @ExceptionHandler(ParameterException.class)
    public ResponseEntity handleParameterException(ParameterException e) {
        log.error(e.getLocalizedMessage()); 
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCode());
    }
}
```
# 完善异常信息

文章中的异常只定义了`code`，具体的异常信息可以写在配置文件中或者保存在数据库中，在捕获到异常之后，找到对应的描述信息返回调用者，增加友好度。

# 完善记录日志

 以上如果发生了异常，在日志文件中是这样记录的

 ```
 10:19:32.024 [http-nio-8080-exec-2] ERROR c.g.e.d.advice.GlobalExceptionAdvice 41 - / by zero
 ```
发现记录的行号是在`GlobalExceptionAdvice`类中，并非是代码真实的位置。

如果要记录到代码的真实位置可以这样实现
```java
 public  String getExceptionDetail(Exception e) {

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(e.getClass() + System.getProperty("line.separator"));
        stringBuilder.append(e.getLocalizedMessage() + System.getProperty("line.separator"));
        StackTraceElement[] arr = e.getStackTrace();
        for (int i = 0; i < arr.length; i++) {
            stringBuilder.append(arr[i].toString() + System.getProperty("line.separator"));

        }
        return stringBuilder.toString();
    }
```
```java
 log.error(getExceptionDetail(e));
```
根据实际情况选择适合自己的方式

# 完整代码

[Github](https://github.com/lizeze/exception-demo)

[Gitee](https://gitee.com/zeze.li/exception-demo)
