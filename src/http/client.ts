// src/api-client.ts

import { RunJobResponse, JobResult } from "./types.js";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:3000";

export const httpHandlers = {
	runJob: async (cpu: number, mem: number): Promise<JobResult> => {
		const res = await fetch(`${BASE_URL}/jobs`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cpu, mem }),
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const response: RunJobResponse = await res.json();
		return response.data;
	},
};

// export async function submitFinalResult(params: type) {}
