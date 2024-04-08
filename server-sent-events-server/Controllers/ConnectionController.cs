using Microsoft.AspNetCore.Mvc;

namespace server_sent_events_server.Controllers
{
    [Route("[controler]")]
    public class ConnectionController : Controller
    {
        [HttpGet]
        public Task<IActionResult> Get()
        {
            this.Response.Headers.ContentType = "text/event-stream";
        }
    }
}
