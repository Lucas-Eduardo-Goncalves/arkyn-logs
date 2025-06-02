import { Hono } from "hono";

import { createDomain } from "../app/usecases/domain/createDomain";
import { deleteDomain } from "../app/usecases/domain/deleteDomain";
import { listDomains } from "../app/usecases/domain/listDomains";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const domainRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

domainRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, createDomain.handle)
);

domainRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listDomains.handle)
);

domainRoutes.delete("/:domainId", async (c) =>
  adaptRoute(c, deleteDomain.handle)
);

export { domainRoutes };
