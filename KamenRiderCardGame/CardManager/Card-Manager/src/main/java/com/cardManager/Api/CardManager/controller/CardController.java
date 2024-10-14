package com.cardManager.Api.CardManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cardManager.Api.CardManager.modelView.SearchCardModelView;
import com.cardManager.Api.CardManager.models.Card;
import com.cardManager.Api.CardManager.repository.CardRepository;

@RestController
@RequestMapping("/api/cards")
public class CardController {
    private final CardRepository CardRepository;
    private final MongoTemplate mongoTemplate;
    @Autowired
    public CardController(CardRepository CardRepository, MongoTemplate mongoTemplate) {
        this.CardRepository = CardRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @PostMapping("/search")
    public List<Card> GetAll(@RequestBody(required = false) SearchCardModelView searchCardModelView) {
        Criteria criteria = new Criteria();
        if(searchCardModelView==null){
            criteria.and("deleted").is(false);
            Query query = new Query(criteria);
            List<Card> cardList = mongoTemplate.find(query, Card.class);
            return cardList;
        }
        if(searchCardModelView.name !=null){
            criteria.orOperator(
                Criteria.where("name").regex(searchCardModelView.name, "i"), 
                Criteria.where("cardNumber").regex(searchCardModelView.name, "i"),
                Criteria.where("description").regex(searchCardModelView.name, "i"),
                Criteria.where("keyWord").in(searchCardModelView.name, "i")
            );
        }
        if(searchCardModelView.idCharacter>=0){
            criteria.and("idCharacter").is(searchCardModelView.idCharacter);
        }
        criteria.and("deleted").is(false);
        Query query = new Query(criteria);
        List<Card> cards = mongoTemplate.find(query, Card.class);
        
        return cards;
    }
    @GetMapping(path = "/{id}")
    public Card GetById(@PathVariable String id) {
        Criteria criteria = Criteria.where("deleted").is(false);
        criteria.and("id").is(id);
        Query query = new Query(criteria);
        Card card = mongoTemplate.findOne(query, Card.class);
        return card;
    }
    
    @PostMapping
    public Card Post(@RequestBody Card card) {
        card.create();
        return CardRepository.save(card);
    }

    @PutMapping(path = "/{id}")
    public Card Put(@PathVariable String id,@RequestBody Card card) {
        Card cardExist=CardRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Card not found!"));

        if(cardExist.isDeleted()){
            new RuntimeException("Card not found!");
        }

        cardExist.setName(card.getName());
        cardExist.setCardNumber(card.getCardNumber());
        cardExist.setDescription(card.getDescription());
        cardExist.setKeyWord(card.getKeyWord());
        cardExist.update();

        CardRepository.save(cardExist);
        return cardExist;
    }

    @DeleteMapping(path = "/{id}")
    public String Delete(@PathVariable String id) {
        Card cardExist=CardRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));;
        cardExist.delete();
        CardRepository.save(cardExist);
        return "Delete Card successfully";
    }
}
