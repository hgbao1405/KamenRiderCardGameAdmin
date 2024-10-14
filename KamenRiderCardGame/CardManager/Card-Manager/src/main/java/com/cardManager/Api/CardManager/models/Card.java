package com.cardManager.Api.CardManager.models;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;

@Document(collection = "cards")
public class Card {
    @Id
    private String id;
    @NotNull(message = "Name cannot be null")
    private String name;
    private String cardNumber;
    private String description;
    private String[] keyWord;
    private int idCharacter;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private LocalDateTime deletedDate;
    private boolean deleted;
    private HtmlStyle style;

    public Card() {
        this.create();
        this.deleted = false;
    }

    public HtmlStyle getStyle() {
        return style;
    }

    public void setStyle(HtmlStyle style) {
        this.style = style;
    }
    // Getters và setters theo quy ước đặt tên chuẩn
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String[] keyWord) {
        this.keyWord = keyWord;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void create() {
        this.createdDate = LocalDateTime.now();
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void update() {
        this.updatedDate = LocalDateTime.now();
    }

    public LocalDateTime getDeletedDate() {
        return deletedDate;
    }

    public void delete() {
        this.deletedDate = LocalDateTime.now();
        this.deleted = true;
    }

    public int getIdCharacter() {
        return idCharacter;
    }

    public void setIdCharacter(int idCharacter) {
        this.idCharacter = idCharacter;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}