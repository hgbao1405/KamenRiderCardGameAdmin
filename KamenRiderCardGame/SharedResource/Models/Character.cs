﻿using SharedResource.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SharedResource.Models
{
    public class Character : ManagementObject
    {
        [Key]
        public int Id { get; set; }
        public int Health { get; set; } = 1000;
        public float Attack { get; set; } = 0;
        public float Kick { get; set; } =  0;
        public float Speed { get; set; } = 0;
        public float Jump { get; set; } = 0;
        [AllowNull]
        public string Description { get; set; }
        [AllowNull]
        public string Avatar { get; set; }
        public int KamenRiderTypeId { get; set; }
        [ForeignKey("KamenRiderTypeId")]
        public virtual KamenRiderType? KamenRiderType { get; set; }
    }
}
