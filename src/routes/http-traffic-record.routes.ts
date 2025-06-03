import { Hono } from "hono";

import { listHttpTrafficRecords } from "../app/usecases/httpTrafficRecord/listHttpTrafficRecords";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const httpTrafficRecordRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

httpTrafficRecordRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listHttpTrafficRecords.handle)
);

export { httpTrafficRecordRoutes };
