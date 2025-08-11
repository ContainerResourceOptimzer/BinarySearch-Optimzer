// http/types.ts

export interface JobResult {
	totalReqs: number;
	durationAvg: number;
	failedRate: number;
	thresholdsPassed: boolean;
}

export interface RunJobResponse {
	status: boolean;
	data: JobResult;
}
