
using System.Runtime.InteropServices;

namespace SharedResource.Models
{
    public class ManagementObject
    {
        public string Name { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public bool Deleted { get; set; }=false;
        public DateTime? DeletedTime { get; set; }

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