
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices;

namespace SharedResource.Models
{
    public class ManagementObject<T> : PublishObject where T : class
    {
        public string Name { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public bool Deleted { get; set; }=false;
        public DateTime? DeletedTime { get; set; }
        [NotMapped]
        public T? UpdateAttr
        {
            get
            {
                return UpdateAttr = string.IsNullOrEmpty(UpdateAttrJson) ? null : 
                    JsonConvert.DeserializeObject<T>(UpdateAttrJson);
            }
            set
            {
                UpdateAttrJson = JsonConvert.SerializeObject(value);
            }
        }

        [AllowNull]
        public string? UpdateAttrJson{ get; set;}

        public void Create()
        {
            CreatedTime = DateTime.Now;
            Deleted = false;
        }

        public void Delete()
        {
            Deleted = true;
            DeletedTime = DateTime.Now;
        }

        public void Update()
        {
            UpdatedTime = DateTime.Now;
        }
    }
}