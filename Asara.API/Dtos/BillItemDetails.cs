namespace Asara.API.Dtos
{
    public class BillItemDetails
    {
        public double Price { get; set; }
        public double Quentity { get; set; }
        public ItemForJson ItemNavigation { get; set; }

    }
}