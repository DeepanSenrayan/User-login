package com.example.loginapp.service;

import com.example.loginapp.model.User;
import com.example.loginapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser (User user){
        return userRepository.save(user);
    }
    public Optional<User> login(String userName, String password){
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent() && user.get().getPassword().equals(password)){
            return user;
        }
        return Optional.empty();
    }


    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
