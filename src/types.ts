// src/types.ts

// 입력 타입 정의 (Input.json)
export interface InputConfig {
	requests: number;
	deadline_ms: number;
	cpu_range: number[];
	mem_range: number[];
	unit_cpu_cost: number;
	unit_mem_cost: number;
	max_concurrency: number;
}

export interface CostNode {
	cost: number;
	resource: [number, number];
}

/** 실험(Job) 결과를 나타내는 인터페이스 */
export interface JobResult {
	/** 유일한 Job 식별자 */
	jobId: string;
	cpu: number;
	mem: number;
	status: string;
	success: boolean;
}
