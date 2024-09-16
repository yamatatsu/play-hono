import { hc } from "hono/client";
import type { app } from "./app";

const client = hc<typeof app>("http://localhost:8787/");

client.users
	.$get()
	.then((res) => res.json())
	.then((json) => {
		json.map;
	});

client.users[":id"]
	.$get({ param: { id: "123" } })
	.then((res) => res.json())
	.then((json) => {
		json.id;
	});
