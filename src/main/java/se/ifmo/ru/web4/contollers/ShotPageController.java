package se.ifmo.ru.web4.contollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.ifmo.ru.web4.entities.Shot;
import se.ifmo.ru.web4.entities.ShotRequest;
import se.ifmo.ru.web4.repositories.ShotsRepository;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/shots")
public class ShotPageController {
    @Autowired
    private ShotsRepository entryRepository;

    @GetMapping
    Collection<Shot> getEntries() {
        return entryRepository.findAll();
    }

    @PostMapping
    Shot addEntry(@RequestBody ShotRequest shotRequest) {
        Shot shot = new Shot(shotRequest.getX(), shotRequest.getY(), shotRequest.getR());

        return entryRepository.save(shot);
    }
}
