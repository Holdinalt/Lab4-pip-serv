package se.ifmo.ru.web4.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import se.ifmo.ru.web4.entities.User;
import se.ifmo.ru.web4.repositories.UserRepository;

@Service
public class UsersService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public boolean doesUserExist(String username){
        return userRepository.countAllByUsername(username) != 0;
    }

    public User getUserByName(String username){
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return user;
    }
}
