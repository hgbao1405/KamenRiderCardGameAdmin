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
        public int Attack { get; set; }=0;
        public int Speed { get; set; }=0;
        public int HPForm { get; set; } = 0;
        public int Kick { get; set; } = 0;

        [ForeignKey("IdTypeForm")]
        public TypeForm TypeForm { get; set; }
    }
}
