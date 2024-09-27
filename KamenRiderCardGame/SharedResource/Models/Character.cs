using SharedResource.Models;
using System.ComponentModel.DataAnnotations;

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
        public string? Description { get; set; }
        public string Avatar { get; set; }
    }
}
