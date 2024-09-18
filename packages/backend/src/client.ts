import { hc } from "hono/client";
import type { app } from "./app";

const client = hc<typeof app>("http://localhost:8787/");

client.users
	.$get()
	.then((res) => res.json())
	.then((json) => {
		json.map;
	});

client.users[":sub"]
	.$get({ param: { sub: "123e4567-e89b-12d3-a456-426614174000" } })
	.then((res) => res.json())
	.then((json) => {
		json.id;
	});
