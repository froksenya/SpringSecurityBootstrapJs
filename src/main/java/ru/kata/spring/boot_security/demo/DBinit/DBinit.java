package ru.kata.spring.boot_security.demo.DBinit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import javax.annotation.PostConstruct;


@Component
public class DBinit {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public DBinit(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void init() {
        Role adminRole = new Role("ROLE_ADMIN");
        Role userRole = new Role("ROLE_USER");
        adminRole = roleRepository.save(adminRole);
        userRole = roleRepository.save(userRole);

        // username = password
        User admin = new User("admin", "$2a$10$fFVyY7vCkix.EHROAM97DuFfvJ20AGOTg8VLTZt75G2ujsEg5uby2", "admin", "adminSurname", "Moscow", (byte) 35);
        User userOne = new User("user1", "$2a$10$P30KFT.Clr4i41q6cFsEYeoS/ceu8LTxCphuwQTmcnZTq1w7TFMS2", "userOne", "surnameOne", "Samara", (byte) 24);

        admin.addRole(adminRole);
        admin.addRole(userRole);
        userOne.addRole(userRole);

        userRepository.save(admin);
        userRepository.save(userOne);

    }
}
