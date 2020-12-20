package se.ifmo.ru.web4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.ifmo.ru.web4.entities.Shot;

@Repository
public interface ShotsRepository extends JpaRepository<Shot,Long> {

}
