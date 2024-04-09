using Microsoft.AspNetCore.Mvc;

namespace server_sent_events_server.Controllers
{
    [Route("[controller]")]
    public class ConnectionController : BaseController
    {
        [HttpGet]
        public async Task Get(CancellationToken ct)
        {
            this.Response.Headers.ContentType = "text/event-stream";
            var id = Guid.NewGuid();

            await this.SerializeDataStream(id, "connection");

            var i = 0;
            while(!ct.IsCancellationRequested)
            {
                i++;
                Thread.Sleep(1000);
                await this.SerializeDataStream($"Message {i}");
            }
        }
    }
}
