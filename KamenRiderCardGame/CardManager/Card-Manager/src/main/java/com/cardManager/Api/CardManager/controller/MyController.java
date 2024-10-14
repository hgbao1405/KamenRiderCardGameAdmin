package com.cardManager.Api.CardManager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MyController {

    @GetMapping("/hello") // Ánh xạ đến phương thức này với HTTP GET request
    public String hello() {
        return "Hello, Spring Boot! a";
    }
    @PostMapping("/create")
    public String create() {
        return "Create endpoint!";
    }

}