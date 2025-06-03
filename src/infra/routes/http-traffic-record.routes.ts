import { Hono } from "hono";

import { RouteAdapter } from "../adapters/routeAdapter";
import { listHttpTrafficRecords } from "../factory/httpTrafficRecord/listHttpTrafficRecordFactory";

const httpTrafficRecordRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

httpTrafficRecordRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listHttpTrafficRecords.handle)
);

export { httpTrafficRecordRoutes };
