using System.ComponentModel.DataAnnotations;

namespace SharedResource.Validates
{
    public class FormKeyWordValidateAttribute : ValidationAttribute
    {
        private readonly string _IdTypeForm;

        public FormKeyWordValidateAttribute(string kanenRiderTypeId)
        {
            _IdTypeForm = kanenRiderTypeId;
            ErrorMessage = "The Form KeyWord is not correct.";
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var IdTypeForm = validationContext.ObjectType.GetProperty(_IdTypeForm);
            if (IdTypeForm == null)
            {
                return new ValidationResult($"Unknown property: {_IdTypeForm}");
            }

            var IdTypeFormValue = (int)IdTypeForm.GetValue(validationContext.ObjectInstance);
            var FormKeyWord = (int)value;

            switch (IdTypeFormValue)
            {
                // Component type Form
                case 1:
                    if (FormKeyWord < 1)
                    {
                        return new ValidationResult("Cannot find this keyword.");
                    }
                    break;
                // Other type form
                default:
                    if (FormKeyWord != 0)
                    {
                        return new ValidationResult("This form is not Component form to set Keyword.");
                    }
                    break;
            }

            return ValidationResult.Success;
        }
    }
}