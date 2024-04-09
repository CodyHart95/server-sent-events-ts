import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import InstantMessage from "./pages/InstantMessage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home
    },
    {
      path: "/message",
      Component: InstantMessage
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
