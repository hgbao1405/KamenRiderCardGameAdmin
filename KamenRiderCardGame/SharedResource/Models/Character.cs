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
        public ICollection<HtmlStye> attrs { get; set; }

        public CardAttrHtml() { }
        
        public CardAttrHtml BasicAttr()
        {
            List<HtmlStye> htmlStye = new List<HtmlStye>();

            HtmlStye AttrHtml = new HtmlStye();

            CardAttrHtml cardAttrHtml = new CardAttrHtml();

            htmlStye.Add(AttrHtml.basicName());
            htmlStye.Add(AttrHtml.basicAvatar());
            htmlStye.Add(AttrHtml.basicDescription());

            cardAttrHtml.attrs = htmlStye;

            return cardAttrHtml;
        }

    }

    public class HtmlStye
    {
        public Attr attr { get; set; }
        public bool? isCenter { get; set; }
        public int? top { get; set; }
        public int? left { get; set; }
        public int? width { get; set; }
        public int? height { get; set; }
        public int? widthPercent { get; set; }
        public int? heightPercent { get; set; }
        public string? color { get; set; }
        public string? fontSize { get; set; }

        public HtmlStye basicName()
        {
            HtmlStye h=new HtmlStye();
            h.attr = new Attr() { Type = "text", Value = "Name" };
            h.color = "#ffffff";
            h.fontSize = "20px";
            h.widthPercent = 100;
            h.top = 10;
            h.left = 10;
            h.isCenter = true;
            return h;
        }
        public HtmlStye basicAvatar()
        {
            HtmlStye h = new HtmlStye();
            h.attr = new Attr() { Type = "image", Value = "https://res.cloudinary.com/dqnqa1sjb/image/upload/cld-sample-3?_a=DATAg1AAZAA0" };
            h.width=180;
            h.height=180;
            h.top = 40;
            h.isCenter = true;
            return h;
        }
        public HtmlStye basicDescription()
        {
            HtmlStye h = new HtmlStye();
            h.attr = new Attr() { Type = "text", Value = "Description" };
            h.color = "#ffffff";
            h.widthPercent = 100;
            h.height = 100;
            h.top = 250;
            return h;
        }
    }

    public class Attr
    {
        public string? Type { get; set; }
        public string? Value { get; set; }
    }
}
