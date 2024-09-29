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
    public class TypeForm
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [AllowNull]
        public string Description { get; set; }
        public int IdKamenRiderType { get; set; }

        [ForeignKey("IdKamenRiderType")]
        public KamenRiderType KamenRiderType { get; set; }
    }
}
