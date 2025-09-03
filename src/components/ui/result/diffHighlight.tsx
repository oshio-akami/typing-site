import {
  diff_match_patch,
  DIFF_DELETE,
  DIFF_INSERT,
  DIFF_EQUAL,
} from "diff-match-patch";
import type { JSX } from "react";

type Props = {
  className?: string;
  original: string;
  input: string;
};

export function DiffHighlight({ className = "", original, input }: Props) {
  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(original, input);
  dmp.diff_cleanupSemantic(diffs);

  const jsx: JSX.Element[] = [];
  let key = 0;

  for (let i = 0; i < diffs.length; i++) {
    const [op, data] = diffs[i];

    if (op === DIFF_EQUAL) {
      jsx.push(<span key={key++}>{data}</span>);
      continue;
    }

    if (op === DIFF_DELETE) {
      if (i + 1 < diffs.length && diffs[i + 1][0] === DIFF_INSERT) {
        const insertData = diffs[i + 1][1];
        jsx.push(
          <span key={key++} className="bg-yellow-100 font-bold">
            {data}
          </span>
        );
        jsx.push(
          <span key={key++} className="bg-red-100 font-bold">
            {insertData}
          </span>
        );
        i++;
      } else {
        jsx.push(
          <span key={key++} className="bg-yellow-100 font-bold">
            {data}
          </span>
        );
      }
    } else if (op === DIFF_INSERT) {
      jsx.push(
        <span key={key++} className="bg-red-100 font-bold">
          {data}
        </span>
      );
    }
  }

  return (
    <div className={`overflow-y-scroll whitespace-pre-wrap ${className}`}>
      {jsx}
    </div>
  );
}
