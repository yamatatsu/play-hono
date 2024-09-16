import { testClient } from "hono/testing";
import { expect, test } from "vitest";
import { app } from "./";

const client = testClient(app);

test("GET /users", async () => {
	// WHEN
	const res = await client.users.$get();

	// THEN
	expect(res.status).toBe(200);
	expect(await res.json()).toEqual([
		{
			id: "123",
			name: "John Doe",
			age: 42,
		},
	]);
});

test("GET /users/123", async () => {
	// WHEN
	const res = await client.users[":id"].$get({ param: { id: "123" } });

	// THEN
	expect(res.status).toBe(200);
	expect(await res.json()).toEqual({
		id: "123",
		name: "John Doe",
		age: 42,
	});
});
