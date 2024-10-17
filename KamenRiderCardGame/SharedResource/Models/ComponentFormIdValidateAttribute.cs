
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SharedResource.Models
{
    public class ComponentFormIdValidateAttribute : ValidationAttribute
    {
        private readonly string _IdTypeForm;

        public ComponentFormIdValidateAttribute(string idTypeForm)
        {
            _IdTypeForm = idTypeForm;
            ErrorMessage = "FormId is not valid";
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var IdTypeForm = validationContext.ObjectType.GetProperty(_IdTypeForm);
            if (IdTypeForm == null)
            {
                return new ValidationResult($"Unknown property: {_IdTypeForm}");
            }

            var IdTypeFormValue = (int)IdTypeForm.GetValue(validationContext.ObjectInstance);
            var ComponentFormId = (string)value;
            var Formid=ComponentFormId.Split(",").ToArray();
            
            switch (IdTypeFormValue)
            {
                // Component type Form
                case 2:
                    if (Formid.Length < 2)
                    {
                        return new ValidationResult("Multiple form is has 2 or more Component form.");
                    }
                    break;
                // Other type form
                default:
                    if (Formid.Length != 1 || Formid[0] == "")
                    {
                        return new ValidationResult("This form is not Multiple form to set Component form.");
                    }
                    break;
            }


            return ValidationResult.Success;
        }
    }
}