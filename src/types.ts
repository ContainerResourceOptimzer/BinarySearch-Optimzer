// src/types.ts

// 입력 타입 정의 (Input.json)
export interface InputConfig {
	exp_id: string;
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

// 실험의 결과로 최적화된 자원 타입 정의
export interface OptimalResource {
	expId: string;
	optimalJobId: string;
	optimalCpu: number;
	optimalMem: string;
}
