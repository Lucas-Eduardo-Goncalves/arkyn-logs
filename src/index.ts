import { Hono } from "hono";

import { handlersFactory } from "./app/handlers/handlersFactory";
import { domainRoutes } from "./routes/domain.routes";
import { pathnameRoutes } from "./routes/pathname.routes";
import { trafficSourceRoutes } from "./routes/trafficSource.routes";
import { userRoutes } from "./routes/user.routes";

const app = new Hono();

handlersFactory();

app.route("/users", userRoutes);
app.route("/traffic-sources", trafficSourceRoutes);
app.route("/domains", domainRoutes);
app.route("/pathnames", pathnameRoutes);

export default app;
