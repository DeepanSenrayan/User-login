package com.example.loginapp.dto;

public class AuthResponse {
    private String token;
    private String userName;
    private String email;

    public AuthResponse(String token, String userName, String email){
        this.token = token;
        this.userName = userName;
        this.email = email;
    }

    public String getToken(){
        return token;
    }
    public String getUserName(){
        return userName;
    }
    public String getEmail(){
        return email;
    }

}
