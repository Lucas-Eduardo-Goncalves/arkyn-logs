import { Hono } from "hono";

import { createHttpTraffic } from "../app/usecases/httpTraffic/createHttpTraffic";
import { listHttpTraffics } from "../app/usecases/httpTraffic/listHttpTraffics";
import { listSummaryHttpTraffics } from "../app/usecases/httpTraffic/listSummaryHttpTraffics";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const httpTrafficRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

httpTrafficRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, createHttpTraffic.handle)
);

httpTrafficRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listHttpTraffics.handle)
);

httpTrafficRoutes.get("/:trafficSourceId/summary", async (c) =>
  adaptRoute(c, listSummaryHttpTraffics.handle)
);

export { httpTrafficRoutes };
