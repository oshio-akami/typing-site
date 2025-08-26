import { diffChars } from "diff";
import type { JSX } from "react";

type Props = {
  original: string;
  input: string;
};

export function DiffHighlight({ original, input }: Props) {
  const diffs = diffChars(original, input);

  const jsx: JSX.Element[] = [];
  let key = 0;

  diffs.forEach((part) => {
    const lines = part.value.split("\n");
    lines.forEach((line, i) => {
      if (i > 0) jsx.push(<br key={`br-${key++}`} />);
      if (part.added) {
        jsx.push(
          <span key={key++} className="bg-red-100 font-bold">
            {line}
          </span>
        );
      } else if (part.removed) {
        jsx.push(
          <span key={key++} className="bg-yellow-100 font-bold">
            {line}
          </span>
        );
      } else {
        jsx.push(<span key={key++}>{line}</span>);
      }
    });
  });

  return <div className="text-[0.85rem] min-h-[700px]">{jsx}</div>;
}
