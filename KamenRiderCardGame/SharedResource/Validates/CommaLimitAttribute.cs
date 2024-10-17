using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedResource.Validates
{
    public class CommaLimitAttribute : ValidationAttribute
    {
        private readonly string _numberComponentFormProperty;

        public CommaLimitAttribute(string numberComponentFormProperty)
        {
            _numberComponentFormProperty = numberComponentFormProperty;
            ErrorMessage = "The number of commas in the keyword field does not match the expected limit.";
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            // Lấy giá trị của thuộc tính numberComponentForm
            var numberComponentFormProperty = validationContext.ObjectType.GetProperty(_numberComponentFormProperty);
            if (numberComponentFormProperty == null)
            {
                return new ValidationResult($"Unknown property: {_numberComponentFormProperty}");
            }

            var numberComponentFormValue = (int)numberComponentFormProperty.GetValue(validationContext.ObjectInstance);

            // Nếu numberComponentForm = 0, thì keyword phải là null
            //if (numberComponentFormValue == 0)
            //{
            //    if (value != null)
            //    {
            //        return new ValidationResult("Keyword must be null when number Component Form is 0.");
            //    }

            //    return ValidationResult.Success;
            //}

            var keywordValue = value as string;
            if (keywordValue != null)
            {
                var keywords = keywordValue.Split(',').Select(k => k.Trim()).ToList();
                if(keywords.Count==1 && keywords[0] == "" && numberComponentFormValue == 0)
                {
                    return ValidationResult.Success;
                }
                // Kiểm tra số lượng từ khóa
                if (keywords.Count != numberComponentFormValue)
                {
                    return new ValidationResult($"The number of keywords should be exactly {numberComponentFormValue}.");
                }

                // Kiểm tra tính duy nhất của từ khóa
                if (keywords.Distinct().Count() != keywords.Count)
                {
                    return new ValidationResult("Keywords must not contain duplicates.");
                }
            }

            return ValidationResult.Success;
        }
    }
}
