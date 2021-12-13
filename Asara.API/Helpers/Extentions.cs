using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Asara.API.Helpers
{
    public static class Extentions
    {
        public static void AddAPIlicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears(age) > DateTime.Today)
                age--;

            return age;
        }
        public static List<int> ConsumeIds(this string Ingredients){
            List<int> Ids = new List<int>();
            foreach(var id in Ingredients.Split(',')){
                Ids.Add(int.Parse(id));
            }
            return Ids;
        }
    }
}