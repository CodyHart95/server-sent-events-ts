using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace server_sent_events_server.Controllers
{
    public class BaseController : Controller
    {
        protected async Task SerializeDataStream(object data, string messageType = "message")
        {
            if (data == null)
            {
                return;
            }

            var streamValue = $"event:{messageType}\ndata:{JsonConvert.SerializeObject(data)}\n\n";
            await this.Response.WriteAsync(streamValue);
            await this.Response.Body.FlushAsync();
        }
    }
}
