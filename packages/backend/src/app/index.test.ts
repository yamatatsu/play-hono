import type { User } from "@prisma/client";
import { testClient } from "hono/testing";
import { afterAll, expect, test } from "vitest";
import { defineUserFactory, initialize } from "../__generated__/fabbrica";
import { prisma } from "../adapters/db/client";
import { app } from "./";

const client = testClient(app);

initialize({ prisma });
const UserFactory = defineUserFactory();

const users: User[] = [];

afterAll(async () => {
	UserFactory.buildList;

	await prisma.user.deleteMany({
		where: { id: { in: users.map((u) => u.id) } },
	});
	await prisma.$disconnect();
});

test("GET /users/123", async () => {
	// GIVEN
	const user = await UserFactory.create();

	// WHEN
	const res = await client.users[":sub"].$get({ param: { sub: user.sub } });

	// THEN
	expect(res.status).toBe(200);
	expect(await res.json()).toEqual(user);
});

test("GET /users/123", async () => {
	// WHEN
	const res = await client.users[":sub"].$get({ param: { sub: "test-sub" } });

	// THEN
	expect(res.status).toBe(404);
	expect(await res.text()).toEqual("No user found");
});
