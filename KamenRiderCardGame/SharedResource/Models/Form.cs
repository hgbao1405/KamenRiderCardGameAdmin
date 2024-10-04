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
    public class Form:ManagementObject
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
    }
}
