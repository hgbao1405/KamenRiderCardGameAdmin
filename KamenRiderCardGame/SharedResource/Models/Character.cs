using Newtonsoft.Json;
using SharedResource.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SharedResource.Models
{
    public class Character : ManagementObject
    {
        [Key]
        public int Id { get; set; }
        public int Health { get; set; } = 1000;
        public float Attack { get; set; } = 0;
        public float Kick { get; set; } =  0;
        public float Speed { get; set; } = 0;
        public float Jump { get; set; } = 0;
        [AllowNull]
        public string Description { get; set; }
        [AllowNull]
        public string Avatar { get; set; }
        public int KamenRiderTypeId { get; set; }
        [ForeignKey("KamenRiderTypeId")]
        public virtual KamenRiderType? KamenRiderType { get; set; }
        [NotMapped]
        public CardAttrHtml? CardAttrBasic
        {
            get
            {
                return JsonCardAttrBasic==null ? null : JsonConvert.DeserializeObject<CardAttrHtml>(JsonCardAttrBasic);
            }
            set
            {
                JsonCardAttrBasic = JsonConvert.SerializeObject(value);
            }
        }
        public string? JsonCardAttrBasic { get; set; }
    }

    public class CardAttrHtml
    {
        public HtmlStye? Name { get; set; }
        public HtmlStye? Avatar { get; set; }
        public HtmlStye? Description { get; set; }

        public CardAttrHtml() { }
        
        public CardAttrHtml BasicAttr()
        {
            HtmlStye htmlStye = new HtmlStye();

            CardAttrHtml cardAttrHtml = new CardAttrHtml();

            cardAttrHtml.Name = htmlStye.basicName();

            cardAttrHtml.Avatar = htmlStye.basicAvatar();

            cardAttrHtml.Description = htmlStye.basicDescription();

            return cardAttrHtml;
        }

    }

    public class HtmlStye
    {
        public bool? isCenter { get; set; }
        public int? top { get; set; }
        public int? left { get; set; }
        public int? right { get; set; }
        public int? bottom { get; set; }
        public int? topPercent { get; set; }
        public int? leftPercent { get; set; }
        public int? rightPercent { get; set; }
        public int? bottomPercent { get; set; }
        public int? width { get; set; }
        public int? height { get; set; }
        public int? widthPercent { get; set; }
        public int? heightPercent { get; set; }
        public string? color { get; set; }
        public string? fontSize { get; set; }
        public string? padding { get; set; }
        public string? margin { get; set; }


        public HtmlStye basicName()
        {
            HtmlStye h=new HtmlStye();
            h.color = "black";
            h.fontSize = "20px";
            h.widthPercent = 100;
            h.top = 10;
            h.left = 10;
            h.isCenter = true;
            return this;
        }
        public HtmlStye basicAvatar()
        {
            HtmlStye h = new HtmlStye();
            h.width=180;
            h.height=180;
            h.top = 40;
            h.isCenter = true;
            return this;
        }
        public HtmlStye basicDescription()
        {
            HtmlStye h = new HtmlStye();
            h.widthPercent = 100;
            h.heightPercent = 100;
            h.bottom = 20;
            return this;
        }
    }
}
