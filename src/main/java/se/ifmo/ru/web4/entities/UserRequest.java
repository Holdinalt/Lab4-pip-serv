package se.ifmo.ru.web4.entities;

import lombok.Data;

@Data
public class UserRequest {//тупо класс чтобы легче было вытаскивать данные из хттп запроса в одну строчку
    private String username;
    private String password;
}
