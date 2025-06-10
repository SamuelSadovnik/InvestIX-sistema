package com.invistaix.sistema.dto;

import com.invistaix.sistema.enums.UserType;
import com.invistaix.sistema.model.AuthenticatedUser;

public class UserDto {
    private String id;
    private String email;
    private String username;
    private UserType userType;

    public UserDto(AuthenticatedUser user) {
        this.id = user.getId().toString();
        this.email = user.getEmail();
        this.username = user.getNome();
        this.userType = user.getUserType();
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public UserType getUserType() {
        return userType;
    }
    public void setUserType(UserType userType) {
        this.userType = userType;
    }
}