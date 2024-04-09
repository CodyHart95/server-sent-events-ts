using server_sent_events_server.Models;

namespace server_sent_events_server
{
    public static class EventDispatch
    {
        public static EventHandler<Message>? messageEventHandler;

        public static void Dispatch(object sender, Message message)
        {
            messageEventHandler?.Invoke(sender, message);
        }
    }
}
