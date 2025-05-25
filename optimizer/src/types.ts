// src/types.ts

// 입력 타입 정의 (Input.json)
export interface InputConfig {
	requests: number;
	deadline_ms: number;
	cpu_range: number[];
	mem_range: number[];
	unit_cpu_cost: number;
	unit_mem_cost: number;
}
