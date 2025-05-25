// src/exec.ts

import { execSync } from "child_process";
// pipe-reader.ts
import * as fs from "fs";

const PIPE_PATH = "../result/result";

export function execDockerRunner(cpu: number, mem: number): boolean {
	try {
		execSync(`bash ../run_with_k6.bash ${cpu} ${mem}`, {
			stdio: "inherit",
		});

		// const readStream = fs.createReadStream(PIPE_PATH, { encoding: "utf-8" });

		// readStream.on("data", (chunk) => {
		// 	// chunk가 Buffer면 string으로 변환
		// 	const str = typeof chunk === "string" ? chunk : chunk.toString("utf-8");
		// 	try {
		// 		const data = JSON.parse(str);
		// 		console.log("파싱된 데이터:", data);
		// 	} catch (e) {
		// 		console.log("일반 텍스트:", str);
		// 	}
		// });

		// readStream.on("end", () => {
		// 	console.log("파이프 종료");
		// });

		const data: string = fs.readFileSync(PIPE_PATH, { encoding: "utf-8" });
		// const json = JSON.parse(data);
		if (data === "Success") return true;
		return false;
	} catch (err) {
		console.error(err);
		return false;
	}
}
