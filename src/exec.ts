// src/exec.ts

import { httpHandlers } from "./http/client.js";
import { JobResult } from "./http/types.js";

export async function execJob(cpu: number, mem: number): Promise<boolean> {
	console.log(`(${cpu}, ${mem}) resource testing started`);
	const result: JobResult = await httpHandlers.runJob(cpu, mem);
	console.log(
		`(${cpu}, ${mem}) resource SLA status: ` +
			(result.thresholdsPassed === true ? "Success" : "Fail")
	);

	return result.thresholdsPassed;
}
