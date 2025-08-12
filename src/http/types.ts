// http/types.ts

export interface JobResult {
	totalReqs: number;
	durationAvg: number;
	failedRate: number;
	thresholdsPassed: boolean;
}

export interface RunJobResponse {
	success: boolean;
	data: JobResult;
}
