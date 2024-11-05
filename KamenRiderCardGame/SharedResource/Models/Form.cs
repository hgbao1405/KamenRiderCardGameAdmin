using SharedResource.Validates;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedResource.Models
{
    public class Form:ManagementObject<FormUpdate>
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int IdCharacter { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int IdTypeForm { get; set; }
        [AllowNull]
        public string Description { get; set; }
        [AllowNull]
        public string Avatar { get; set; }
        public float Attack { get; set; }=0;
        public float Speed { get; set; }=0;
        public float Kick { get; set; } = 0;
        public float Jump { get; set; } = 0;
        public int HPForm { get; set; } = 0;

        [ForeignKey("IdTypeForm")]
        public virtual TypeForm? TypeForm { get; set; }

        [FormKeyWordValidate("IdTypeForm")]
        public int FormKeyWordNumber { get; set; } = 0;
        
        [ComponentFormIdValidate("IdTypeForm")]
        public string? ComponentFormId { get; set; }
    }

    public class FormUpdate: UpdateObject<Form>
    {
        public string Name { get; set; }
        public string Avatar { get; set; }
        public float Attack { get; set; }
        public float Speed { get; set; }
        public float Kick { get; set; }
        public float Jump { get; set; }
        public int HPForm { get; set; }

        public override void Update(Form _new, Form _old, int idUpdateCalendar)
        {
            base.Update(_new, _old, idUpdateCalendar);
            if (_new != _old)
            {
                if (_new.Name != _old.Name) Name = _new.Name;    
                if (_new.Avatar != _old.Avatar) Avatar = _new.Avatar;
                if (_new.Attack != _old.Attack) Attack = _new.Attack;
                if (_new.Speed != _old.Speed) Speed = _new.Speed;
                if (_new.Kick != _old.Kick) Kick = _new.Kick;
                if (_new.Jump != _old.Jump) Jump = _new.Jump;
                if (_new.HPForm != _old.HPForm) HPForm = _new.HPForm;
            }
        }
    }
}
