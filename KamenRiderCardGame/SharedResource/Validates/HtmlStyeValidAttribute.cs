using SharedResource.Models;
using System.ComponentModel.DataAnnotations;

namespace SharedResource.Validates
{
    public class HtmlStyeValidAttribute : ValidationAttribute
    {
        public HtmlStyeValidAttribute() {
            ErrorMessage = "Card attribute is invalid!";
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            List<Attr> basicattr = new List<Attr>();

            basicattr.Add( new Attr() { Type = "text", Name = "name" });
            basicattr.Add( new Attr() { Type = "image", Name = "avatar" });
            basicattr.Add( new Attr() { Type = "text", Name = "description" });

            if (value is HtmlStye[] styles)
            {
                List<Attr> htmlStye =styles.Where(x=>x.attr.Name!=null).Select(x=>x.attr).ToList();
                if (htmlStye.Count == 0)
                {
                    return new ValidationResult("List Card attribute is null!!");
                }

                foreach(Attr attr in basicattr)
                {
                    if(htmlStye.Where(x=>x.Name==attr.Name && x.Type == attr.Type).Count() == 0)
                    {
                        return new ValidationResult($"Attribute basic {attr.Type}: {attr.Name} not found!!");
                    }
                }
            }
            return ValidationResult.Success;
        }
    }
}