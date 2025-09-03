import type { Result } from "@/types/result";

const STORAGE_KEY = "typingResults";

/**リザルトを保存(最新10件のみ) */
export function saveResult(result: Result) {
  const data = localStorage.getItem(STORAGE_KEY);
  const results: Result[] = data ? JSON.parse(data) : [];
  results.unshift(result);
  if (results.length > 10) {
    results.length = 10;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function getResults(): Result[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as Result[]) : [];
}
