package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    public User findByUsername(String username);

    public User getUser(Long userID);

    public void deleteUser(Long userID);

    public List<User> getAllUsers();

    public void saveUser(User user);

    public void updateUser(User user);
}
