package com.example.loginapp.controller;

import com.example.loginapp.dto.AuthResponse;
import com.example.loginapp.model.User;
import com.example.loginapp.security.JwtUtil;
import com.example.loginapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){
        System.out.println("Register Body: " + user);
        userService.registerUser(user);
        return ResponseEntity.ok("User Registered Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        Optional<User> loggedIn = userService.login(user.getUserName(), user.getPassword());
        if (loggedIn.isPresent()){
            User u = loggedIn.get();
            String token = jwtUtil.generateToken(u.getUserName());
            return ResponseEntity.ok(new AuthResponse(token, u.getUserName(), u.getEmail()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid id credentials!");
    }

    @GetMapping("/secure")
    public ResponseEntity<String> secureEndPoint(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer " , "");
        if (jwtUtil.validateToken(token)){
            String userName = jwtUtil.extractUserName(token);
            return ResponseEntity.ok("Welcome " + userName + " this is secure page! ");
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader ("Authorization") String authHeader){

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or Invalid Authorization header");
        }

        String token = authHeader.replace("Bearer ", "").trim();
        if(!jwtUtil.validateToken(token)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }
        String userName = jwtUtil.extractUserName(token);
        Optional<User> user = userService.findByUserName(userName);
        if(user.isPresent()){
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
    }
}

