package com.invistaix.sistema.enums;

public enum UserType {
    ADMIN("admin"),
    GESTOR("gestor"),
    PROPRIETARIO("proprietario");

    private final String value;

    UserType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}