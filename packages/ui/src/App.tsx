import { useQuery } from "@tanstack/react-query";
import { hc } from "hono/client";

import type { Api } from "server/src/index";

const client = hc<Api>("/");

async function get() {
	const res = await client.api.$get();
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	return (await res.json()).message;
}

export default function App() {
	const { data } = useQuery({
		queryKey: ["get"],
		queryFn: get,
	});

	return (
		<div>
			<p>Hello, world from the client!</p>
			<p>{data}</p>
		</div>
	);
}
