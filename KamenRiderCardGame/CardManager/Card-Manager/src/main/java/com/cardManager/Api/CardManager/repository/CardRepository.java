package com.cardManager.Api.CardManager.repository;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.cardManager.Api.CardManager.modelView.SearchCardModelView;
import com.cardManager.Api.CardManager.models.Card;

import java.util.List;

public interface CardRepository extends MongoRepository<Card, String> {
    List<Card> findByName(String name);
    List<Card> findByIdCharacter(int idCharacter);
    List<Card> findByDeleted(boolean deleted);
}
