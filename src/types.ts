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
