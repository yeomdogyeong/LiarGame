import Main from "./page/Main";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import { createBrowserRouter } from "react-router-dom";
import Door from "./page/Door";
import Room from "./page/Room";

export const routers: RemixRouter = createBrowserRouter([
  {
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/door",
        element: <Door />,
      },
      {
        path: "/room",
        element: <Room />,
      },
    ],
  },
]);
