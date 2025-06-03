import { Hono } from "hono";

import { RouteAdapter } from "../adapters/routeAdapter";
import { createHttpTraffic } from "../factory/httpTraffic/createHttpTrafficFactory";
import { listHttpTraffics } from "../factory/httpTraffic/listHttpTrafficFactory";

const httpTrafficRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

httpTrafficRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, createHttpTraffic.handle)
);

httpTrafficRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listHttpTraffics.handle)
);

export { httpTrafficRoutes };
