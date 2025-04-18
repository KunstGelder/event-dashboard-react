import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage.jsx";
import { EventsPage } from "./pages/EventsPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/views/Root.jsx";
import { EventForm } from "./components/forms/EventForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage /> 
      },
      {
        path: "/event/:eventId",
        element: <EventPage />
      },
      {
        path: "/edit-event/:eventId",
        element: <EventForm />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
d