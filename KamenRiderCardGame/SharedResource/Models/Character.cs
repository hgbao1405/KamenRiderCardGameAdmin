using SharedResource.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SharedResource.Models
{
    public class Character : ManagementObject
    {
        [Key]
        public int Id { get; set; }
        public int Health { get; set; } = 0;
        public int Attack { get; set; } = 0;
        public int Kick { get; set; } = 0;
        public int Speed { get; set; } = 0;
        public int Jump { get; set; } = 0;
        [AllowNull]
        public string Description { get; set; }
        [AllowNull]
        public string Avatar { get; set; }
        public int KamenRiderTypeId { get; set; }
        [ForeignKey("KamenRiderTypeId")]
        public KamenRiderType KamenRiderType { get; set; }
    }
}
