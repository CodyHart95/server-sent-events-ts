using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using server_sent_events_server;
using server_sent_events_server.Controllers;
using server_sent_events_server.Models;

namespace Controllers
{
    [Route("[controller]")]
    public class MessageController : BaseController
    {
        [HttpGet]
        public async Task Get(CancellationToken ct)
        {
            this.Response.Headers.ContentType = "text/event-stream";
            var id = Guid.NewGuid();

            await this.SerializeDataStream(id, "connection");
            await this.Response.Body.FlushAsync();

            EventDispatch.messageEventHandler += (object? sender, Message eventData) => OnMessage(sender, eventData, id.ToString());

            while(!ct.IsCancellationRequested)
            {

            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Message message)
        {
            EventDispatch.Dispatch(this, message);
            return Ok();
        }

        private async void OnMessage(object? sender, Message eventData, string id)
        {
            if(eventData.Recipient == id)
            {
                await SerializeDataStream(eventData.Text);
            }
        }
    }
}
