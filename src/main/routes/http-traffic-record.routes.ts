import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { composeHttpTrafficRecord } from "../factory/httpTrafficRecord/composeHttpTrafficRecordFactory";
import { listHttpTrafficRecords } from "../factory/httpTrafficRecord/listHttpTrafficRecordFactory";

const httpTrafficRecordRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

httpTrafficRecordRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listHttpTrafficRecords.handle)
);

httpTrafficRecordRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, composeHttpTrafficRecord.handle)
);

export { httpTrafficRecordRoutes };
