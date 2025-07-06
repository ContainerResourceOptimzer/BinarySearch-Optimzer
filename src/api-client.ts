// src/api-client.ts

import type { JobResult } from "./types.js";
import { setTimeout as sleep } from "node:timers/promises";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:3000";
const POLL_INTERVAL = 2000;

export async function submitJob(cpu: number, mem: number): Promise<string> {
	const res = await fetch(`${BASE_URL}/jobs`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ cpu, mem }),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);

	const data = await res.json();
	return data.jobId;
}

export async function pollJobResult(jobId: string): Promise<JobResult> {
	while (true) {
		const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
			method: "GET",
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const data: JobResult = await res.json();
		if (data.status === "done" || data.status === "failed") return data;
		await sleep(POLL_INTERVAL);
	}
}
