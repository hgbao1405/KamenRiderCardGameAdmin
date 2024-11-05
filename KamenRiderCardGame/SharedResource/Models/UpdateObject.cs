namespace SharedResource.Models
{
    public class UpdateObject<T> where T : class
    {
        public string Name { get; set; }
        public int IdUpdateCalendar { get; set; }
        public virtual void Update(T _new, T _old, int idUpdateCalendar) {
            IdUpdateCalendar = idUpdateCalendar;
        }
    }
}