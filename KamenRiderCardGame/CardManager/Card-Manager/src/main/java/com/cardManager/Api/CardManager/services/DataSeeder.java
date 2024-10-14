package com.cardManager.Api.CardManager.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.cardManager.Api.CardManager.repository.CardRepository;
import com.cardManager.Api.CardManager.models.Card;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CardRepository CardRepository;

    @Override
    public void run(String... args) throws Exception {
        // Xóa dữ liệu cũ
        // CardRepository.deleteAll();

        // // Thêm dữ liệu mới
        // Card user1 = new Card();
        // user1.setName("Card 1");
        // user1.setCardNumber("1234567890");
        // user1.setDescription("Description 1");
        // user1.setKeyWord(new String[] {"Keyword 1"});

        // Card user2 = new Card();
        // user2.setName("Card 2");
        // user2.setCardNumber("0987654321");
        // user2.setDescription("Description 2");
        // user2.setKeyWord(new String[] {"Keyword 2"});
        
        
        // CardRepository.saveAll(Arrays.asList(user1, user2));

        //System.out.println("Data seeding completed!");
    }
}
