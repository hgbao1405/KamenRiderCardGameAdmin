using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedResource.Validates
{
    public class NumberComponentByKamenRiderAttribute: ValidationAttribute
    {
        private readonly string _KanenRiderTypeId;

        public NumberComponentByKamenRiderAttribute(string kanenRiderTypeId)
        {
            _KanenRiderTypeId = kanenRiderTypeId;
            ErrorMessage = "The number of components is not correct.";
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var KanenRiderTypeId = validationContext.ObjectType.GetProperty(_KanenRiderTypeId);
            if (KanenRiderTypeId == null)
            {
                return new ValidationResult($"Unknown property: {_KanenRiderTypeId}");
            }

            var KanenRiderTypeIdValue = (int)KanenRiderTypeId.GetValue(validationContext.ObjectInstance);
            var numberComponentForm = (int)value;

            switch (KanenRiderTypeIdValue)
            {
                case 1:

                    if (numberComponentForm < 2)
                    {
                        return new ValidationResult("MultipleComponent Kamen Rider has 2 or more components.");
                    }
                    break;
                 default:
                    if (numberComponentForm != 0)
                    {
                        return new ValidationResult("Number Component Form must be 0 for other Kanen Rider.");
                    }
                    break;
            }

            return ValidationResult.Success;
        }
    }
}
