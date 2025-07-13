import { Hono } from "hono";
import { author, license, name, version } from "../package.json";

import { handlersFactory } from "./app/handlers/handlersFactory";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";

import { environmentVariables } from "./main/config/environmentVariables";
import { coreLogRoutes } from "./main/routes/core-log";
import { corePathnameRoutes } from "./main/routes/core-pathname.routes";
import { domainRoutes } from "./main/routes/domain.routes";
import { httpTrafficRecordRoutes } from "./main/routes/http-traffic-record.routes";
import { httpTrafficRoutes } from "./main/routes/http-traffic.routes";
import { pathnameRoutes } from "./main/routes/pathname.routes";
import { requestRoutes } from "./main/routes/request.routes";
import { responseRoutes } from "./main/routes/response.routes";
import { trafficSourceRoutes } from "./main/routes/trafficSource.routes";
import { userRoutes } from "./main/routes/user.routes";
import { webhookRoutes } from "./main/routes/webhook.route";

const app = new Hono();

handlersFactory();

app.use("*", (c, next) => RouteLogMiddleware.logRoute(c, next));
app.get("/", (c) => c.json({ author, name, license, version }));

app.route("/core-logs", coreLogRoutes);
app.route("/core-pathnames", corePathnameRoutes);
app.route("/domains", domainRoutes);
app.route("/http-traffic-records", httpTrafficRecordRoutes);
app.route("/http-traffics", httpTrafficRoutes);
app.route("/pathnames", pathnameRoutes);
app.route("/requests", requestRoutes);
app.route("/responses", responseRoutes);
app.route("/traffic-sources", trafficSourceRoutes);
app.route("/users", userRoutes);
app.route("/webhooks", webhookRoutes);

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
