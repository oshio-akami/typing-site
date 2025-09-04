import { diff_match_patch, DIFF_DELETE, DIFF_INSERT } from "diff-match-patch";

export const getDiffs = (originalText: string, inputText: string) => {
  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(originalText, inputText);
  dmp.diff_cleanupSemantic(diffs);

  let omissionCount = 0;
  let insertionCount = 0;
  let missTakeCount = 0;

  for (let i = 0; i < diffs.length; i++) {
    const [op, data] = diffs[i];

    if (op === DIFF_DELETE) {
      if (i + 1 < diffs.length && diffs[i + 1][0] === DIFF_INSERT) {
        const insertData = diffs[i + 1][1];
        const replaceCount = Math.max(data.length, insertData.length);
        missTakeCount += replaceCount;
        i++;
      } else {
        omissionCount += data.length;
      }
    } else if (op === DIFF_INSERT) {
      insertionCount += data.length;
    }
  }
  /**余計な入力含めて全体数に */
  const totalCount = originalText.length + insertionCount;
  const sum = originalText.length - omissionCount - missTakeCount;
  const accuracy = Math.round((sum / totalCount) * 1000) / 10;
  return {
    accuracy: accuracy,
    omissionCount: omissionCount,
    missTakeCount: missTakeCount,
    insertionCount: insertionCount,
  };
};
