using Newtonsoft.Json;
using SharedResource.Models;
using SharedResource.Validates;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SharedResource.Models
{
    public class Character : ManagementObject<CharacterUpdate>
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
                return JsonCardAttrBasic==null ? new CardAttrHtml().BasicAttr(): JsonConvert.DeserializeObject<CardAttrHtml>(JsonCardAttrBasic);
            }
            set
            {
                JsonCardAttrBasic = JsonConvert.SerializeObject(value);
            }
        }
        public string? JsonCardAttrBasic { get; set; }
        //số component của 1 mutiple form
        [NumberComponentByKamenRider("KamenRiderTypeId")]
        public int numberComponentForm { get; set; } = 0;
        //các từ khóa của mutiple form vd: head, arm, leg
        [CommaLimit("numberComponentForm")]
        public string? keyword { get; set; }
    }

    public class CharacterUpdate: UpdateObject<Character>
    {
        public int Health { get; set; }
        public float? Attack { get; set; }
        public float? Kick { get; set; }
        public float? Speed { get; set; }
        public float? Jump { get; set; }
        [AllowNull]
        public string? Avatar { get; set; }

        public override void Update(Character _new, Character _old, int idUpdateCalendar)
        {
            base.Update(_new, _old, idUpdateCalendar);
            if (_new != _old)
            {
                if (_new.Name != _old.Name) Name = _new.Name;
                if (_new.Health != _old.Health) Health = _new.Health;
                if (_new.Attack != _old.Attack) Attack = _new.Attack;
                if (_new.Kick != _old.Kick) Kick = _new.Kick;
                if (_new.Speed != _old.Speed) Speed = _new.Speed;
                if (_new.Jump != _old.Jump) Jump = _new.Jump;
                if (_new.Avatar != _old.Avatar) Avatar = _new.Avatar;
            }
        }
    }

    public class CardAttrHtml
    {
        [HtmlStyeValid]
        public ICollection<HtmlStye> attrs { get; set; }
        public string? backImage { get; set; }
        public string? frontImage { get; set; }

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
            cardAttrHtml.frontImage = "https://res.cloudinary.com/dqnqa1sjb/image/upload/cld-sample-5?_a=DATAg1AAZAA0";
            cardAttrHtml.backImage = "https://res.cloudinary.com/dqnqa1sjb/image/upload/cld-sample-4?_a=DATAg1AAZAA0";
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
            h.attr = new Attr() { Type = "text",Name="name", Value = "Name" };
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
            h.attr = new Attr() { Type = "image",Name="avatar", Value = "https://res.cloudinary.com/dqnqa1sjb/image/upload/cld-sample-3?_a=DATAg1AAZAA0" };
            h.width=180;
            h.height=180;
            h.top = 40;
            h.left = 10;
            return h;
        }
        public HtmlStye basicDescription()
        {
            HtmlStye h = new HtmlStye();
            h.attr = new Attr() { Type = "text",Name= "description", Value = "Description" };
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
        public string? Name {  get; set; }
        public string? Value { get; set; }
    }
}
