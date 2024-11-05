namespace SharedResource.Models
{
    public class PublishObject
    {
        public bool IsPubish { get; set; } = false;

        public void Publish()
        {
            IsPubish = true;
        }
        public void UnPublish()
        {
            IsPubish = false;
        }
    }
}