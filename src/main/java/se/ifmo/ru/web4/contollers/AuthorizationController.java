package se.ifmo.ru.web4.contollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import se.ifmo.ru.web4.entities.User;
import se.ifmo.ru.web4.entities.UserRequest;
import se.ifmo.ru.web4.services.UsersService;

@RestController
@RequestMapping("/authorization")
public class AuthorizationController {
    @Autowired
    private UsersService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping("/logout")
    void logout(){

    }

    @GetMapping("/signin")
    void login() {
    }

    @PostMapping("/signup")
    ResponseEntity<String> signUp(@RequestBody UserRequest userRequest) {
        if(!userService.doesUserExist(userRequest.getUsername())) {
            User user = new User(userRequest.getUsername(), userRequest.getPassword());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.addUser(user);
            return new ResponseEntity<>("Registered", HttpStatus.CREATED);

        }else return new ResponseEntity<>("This username is already taken", HttpStatus.UNPROCESSABLE_ENTITY);
    }


}
