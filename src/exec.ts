// src/exec.ts

import { submitJob, pollJobResult } from "./api-client.js";

export async function execExperiment(
	cpu: number,
	mem: number
): Promise<boolean> {
	const jobId = await submitJob(cpu, mem);
	const result = await pollJobResult(jobId);
	return result.success; // SLA 통과 여부
}
