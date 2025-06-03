import { Hono } from "hono";

import { handlersFactory } from "./app/handlers/handlersFactory";
import { domainRoutes } from "./infra/routes/domain.routes";
import { httpTrafficRecordRoutes } from "./infra/routes/http-traffic-record.routes";
import { httpTrafficRoutes } from "./infra/routes/http-traffic.routes";
import { pathnameRoutes } from "./infra/routes/pathname.routes";
import { trafficSourceRoutes } from "./infra/routes/trafficSource.routes";
import { userRoutes } from "./infra/routes/user.routes";

const app = new Hono();

handlersFactory();

app.route("/users", userRoutes);
app.route("/traffic-sources", trafficSourceRoutes);
app.route("/domains", domainRoutes);
app.route("/pathnames", pathnameRoutes);
app.route("/http-traffics", httpTrafficRoutes);
app.route("/http-traffic-records", httpTrafficRecordRoutes);

export default app;
