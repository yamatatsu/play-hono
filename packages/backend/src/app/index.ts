import { Hono } from "hono";
import users from "./routes/users";

export const app = new Hono().route("/", users);
