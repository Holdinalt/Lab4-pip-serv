package se.ifmo.ru.web4.models;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CheckerConfig {

    Checker checker = new Checker();

    @Bean
    public Checker getChecker(){
        return checker;
    }
}
