package se.ifmo.ru.web4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.ifmo.ru.web4.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);
    int countAllByUsername(String username);
}
