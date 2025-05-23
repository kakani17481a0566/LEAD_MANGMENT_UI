// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import { AppLayout } from "app/layouts/AppLayout";
import { DynamicLayout } from "app/layouts/DynamicLayout";
import AuthGuard from "middleware/AuthGuard";

// ----------------------------------------------------------------------

const protectedRoutes = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboards" />,
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/leads" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/leads")).default,
              }),
            },
            {
              path: "ceo",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/ceo")).default,
              }),
            },
            {
              path: "franchise",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/franchise")).default,
              }),
            },
            {
              path: "teacher",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/teacher")).default,
              }),
            },
            {
              path: "addlead",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/addlead")).default,
              }),
            },
            {
              path: "lead",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/leads")).default,
              }),
            },
            {
              path: "leads",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/orders")).default,
              }),
            },
          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (await import("app/pages/settings/sections/General"))
                  .default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
