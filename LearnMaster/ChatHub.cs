using IdentityModel.Client;
using LearnMaster.Models;
using Microsoft.AspNetCore.SignalR;
using Serilog;
using System.Net.Http.Headers;

namespace WebApi
{
    public class ChatHub:Hub
    {
        public async Task Send(string message, string token, string courseId, string date)
        {
            HttpClient client = new HttpClient();
            HttpContext context = Context.GetHttpContext();
            try
            { 
                client.BaseAddress = new Uri("https://localhost:7002/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                client.SetBearerToken(token);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
           
            if (Int64.TryParse(courseId, out long CourseId))
            {
                MessageDTO newMessage = new MessageDTO { Text = message, Date = date, CourseId=CourseId};
                HttpResponseMessage response = await client.PostAsJsonAsync("Message", newMessage);
                newMessage.UserName = await response.Content.ReadFromJsonAsync<string>();

                await this.Clients.All.SendAsync("send", newMessage);
            }
           
            Log.Information("No correct courseId");
            
        }
    }
}
