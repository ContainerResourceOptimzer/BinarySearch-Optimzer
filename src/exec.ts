// src/exec.ts

import { submitJob } from "./api-client.js";

export async function execExperiment(
	cpu: number,
	mem: number
): Promise<boolean> {
	console.log(`(${cpu}, ${mem}) resource testing started`);
	const result = await submitJob(cpu, mem);
	console.log(
		`(${cpu}, ${mem}) resource SLA status: ` +
			(result.success === true ? "Success" : "Fail")
	);

	return result.success;
}
