* AutoPrefixUrlMapping.java
```java
public class AutoPrefixUrlMapping extends RequestMappingHandlerMapping {

    @Value("${api-package}")
    private String apiPackagePath;

    @Override
    protected RequestMappingInfo getMappingForMethod(Method method, Class<?> handlerType) {
        RequestMappingInfo mappingInfo =  super.getMappingForMethod(method, handlerType);
        if(mappingInfo != null){
            String prefix = this.getPrefix(handlerType);
            return RequestMappingInfo.paths(prefix).build().combine(mappingInfo);
        }
        return mappingInfo;
    }

    private String getPrefix(Class<?> handlerType){
        String packageName = handlerType.getPackage().getName();
        String dotPath = packageName.replaceAll(this.apiPackagePath,"");
        return dotPath.replace(".", "/");
    }
}
```

* AutoPrefixConfiguration.java
```java

@Configuration
public class AutoPrefixConfiguration implements WebMvcRegistrations {

    @Override
    public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
        return new AutoPrefixUrlMapping();
    }
}
```


* application.yml

```yml
  api-package: com.example.demo
```
* DemoController

```java
@RestController
@RequestMapping("/demo")
public class DemoController {

    @GetMapping("/a")
    public ResponseEntity getUser() {
        return ResponseEntity.status(HttpStatus.OK).body("22");
    }

```
 *  目录结构

  ![2](/img/java/api.png)

请求地址:http://localhost:8080/api/demo/a