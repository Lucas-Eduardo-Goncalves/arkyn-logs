import { Hono } from "hono";
import { User } from "./app/entities/User";

const app = new Hono();

app.get("/", (c) => {
  const user = User.create({ mail: "", name: "", password: "", utc: 0 });
  return c.json(user.toJson());
});

export default app;
