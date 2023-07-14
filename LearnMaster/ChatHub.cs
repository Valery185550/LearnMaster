using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;

namespace WebApi
{
    public class ChatHub:Hub
    {
        public async Task Send(string message)
        {
            
            await this.Clients.All.SendAsync("send",message);
        }
    }
}
