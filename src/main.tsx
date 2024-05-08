import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/site/theme-provider.tsx";
import Root from "./routes/root.tsx";
import Projects from "./routes/projects/page.tsx";
import { Toaster } from "sonner";
import Books from "./routes/books/page.tsx";
import Skills from "./routes/skills/page.tsx";
import Blogs from "./routes/blogs/page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/books",
        element: <Books />,
      },

      {
        path: "/skills",
        element: <Skills />,
      },


      {
        path: "/blogs",
        element: <Blogs />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </TooltipProvider>
  </React.StrictMode>,
);
