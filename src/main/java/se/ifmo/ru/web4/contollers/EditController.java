package se.ifmo.ru.web4.contollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.ifmo.ru.web4.entities.EditRequest;
import se.ifmo.ru.web4.models.Checker;
import se.ifmo.ru.web4.models.CheckerConfig;

import java.util.Arrays;


@RestController
@RequestMapping("/edit")
public class EditController {

    @Autowired
    private Checker checker;

    @PostMapping
    ResponseEntity<String> edit(@RequestBody EditRequest editRequest){
        System.out.println("new Poly");
        System.out.println(Arrays.deepToString(editRequest.getDots()));
        checker.makeCheckerFromArray(editRequest.getDots());
        System.out.println("Now " + checker.getCheckTypeStandardString());
        return new ResponseEntity<>("Edited", HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<String> clear(){
        checker.clear();
        System.out.println("Now " + checker.getCheckTypeStandardString());
        return new ResponseEntity<>("Cleaned", HttpStatus.OK);
    }
}
