import { Hono } from "hono";

import { handlersFactory } from "./app/handlers/handlersFactory";
import { corePathnameRoutes } from "./infra/routes/core-pathname.routes";
import { domainRoutes } from "./infra/routes/domain.routes";
import { httpTrafficRecordRoutes } from "./infra/routes/http-traffic-record.routes";
import { httpTrafficRoutes } from "./infra/routes/http-traffic.routes";
import { pathnameRoutes } from "./infra/routes/pathname.routes";
import { requestRoutes } from "./infra/routes/request.routes";
import { responseRoutes } from "./infra/routes/response.routes";
import { trafficSourceRoutes } from "./infra/routes/trafficSource.routes";
import { userRoutes } from "./infra/routes/user.routes";

const app = new Hono();

handlersFactory();

app.route("/core-pathnames", corePathnameRoutes);
app.route("/domains", domainRoutes);
app.route("/http-traffic-records", httpTrafficRecordRoutes);
app.route("/http-traffics", httpTrafficRoutes);
app.route("/pathnames", pathnameRoutes);
app.route("/requests", requestRoutes);
app.route("/responses", responseRoutes);
app.route("/traffic-sources", trafficSourceRoutes);
app.route("/users", userRoutes);

export default app;
