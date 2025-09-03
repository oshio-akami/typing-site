/**タイピングのリザルト */
export interface Result {
  /**日時 */
  date: Date;
  /**経過時間(秒) */
  timeInSeconds: number;
  /**タイピングの原文 */
  originalText: string;
  /**タイピングで入力した文 */
  inputText: string;
  /**正確率(%) */
  accuracy: number;
  /**入力ミスのカウント */
  missTakeCount: number;
  /**入力漏れのカウント */
  omissionCount: number;
  /**余計な入力 */
  insertionCount: number;
}
