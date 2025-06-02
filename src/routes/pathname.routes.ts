import { Hono } from "hono";

import { createPathname } from "../app/usecases/pathname/createPathname";
import { deletePathname } from "../app/usecases/pathname/deletePathname";
import { listPathnames } from "../app/usecases/pathname/listPathnames";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const pathnameRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

pathnameRoutes.post("/:trafficSourceId/:domainId", async (c) =>
  adaptRoute(c, createPathname.handle)
);

pathnameRoutes.get("/:trafficSourceId/:domainId", async (c) =>
  adaptRoute(c, listPathnames.handle)
);

pathnameRoutes.delete("/:pathnameId", async (c) =>
  adaptRoute(c, deletePathname.handle)
);

export { pathnameRoutes };
