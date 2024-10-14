package com.cardManager.Api.CardManager.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class MongoConnectionTest implements CommandLineRunner {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void run(String... args) throws Exception {
        boolean connected = mongoTemplate.getDb().getName() != null;
        if (connected) {
            System.out.println("Connected to MongoDB successfully!");
        } else {
            System.out.println("Failed to connect to MongoDB.");
        }
    }
}