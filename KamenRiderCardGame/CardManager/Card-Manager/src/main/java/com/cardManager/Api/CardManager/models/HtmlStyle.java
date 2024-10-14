package com.cardManager.Api.CardManager.models;

public class HtmlStyle {
    private Attr attr;
    private Boolean isCenter; // Sử dụng Boolean để cho phép null
    private Integer top; // Sử dụng Integer để cho phép null
    private Integer left; // Sử dụng Integer để cho phép null
    private Integer width; // Sử dụng Integer để cho phép null
    private Integer height; // Sử dụng Integer để cho phép null
    private Integer widthPercent; // Sử dụng Integer để cho phép null
    private Integer heightPercent; // Sử dụng Integer để cho phép null
    private String color;
    private String fontSize;

    public HtmlStyle basicName() {
        HtmlStyle h = new HtmlStyle();
        h.setAttr(new Attr("text", "Name"));
        h.setColor("#ffffff");
        h.setFontSize("20px");
        h.setWidthPercent(100);
        h.setTop(10);
        h.setLeft(10);
        h.setIsCenter(true);
        return h;
    }

    public HtmlStyle basicAvatar() {
        HtmlStyle h = new HtmlStyle();
        h.setAttr(new Attr("image", "https://res.cloudinary.com/dqnqa1sjb/image/upload/cld-sample-3?_a=DATAg1AAZAA0"));
        h.setWidth(180);
        h.setHeight(180);
        h.setTop(40);
        h.setIsCenter(true);
        return h;
    }

    public HtmlStyle basicDescription() {
        HtmlStyle h = new HtmlStyle();
        h.setAttr(new Attr("text", "Description"));
        h.setColor("#ffffff");
        h.setWidthPercent(100);
        h.setHeight(100);
        h.setTop(250);
        return h;
    }

    // Getters và Setters
    public Attr getAttr() {
        return attr;
    }

    public void setAttr(Attr attr) {
        this.attr = attr;
    }

    public Boolean getIsCenter() {
        return isCenter;
    }

    public void setIsCenter(Boolean isCenter) {
        this.isCenter = isCenter;
    }

    public Integer getTop() {
        return top;
    }

    public void setTop(Integer top) {
        this.top = top;
    }

    public Integer getLeft() {
        return left;
    }

    public void setLeft(Integer left) {
        this.left = left;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWidthPercent() {
        return widthPercent;
    }

    public void setWidthPercent(Integer widthPercent) {
        this.widthPercent = widthPercent;
    }

    public Integer getHeightPercent() {
        return heightPercent;
    }

    public void setHeightPercent(Integer heightPercent) {
        this.heightPercent = heightPercent;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getFontSize() {
        return fontSize;
    }

    public void setFontSize(String fontSize) {
        this.fontSize = fontSize;
    }
}

class Attr {
    private String type;
    private String value;

    public Attr(String type, String value) {
        this.type = type;
        this.value = value;
    }

    // Getters và Setters
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
