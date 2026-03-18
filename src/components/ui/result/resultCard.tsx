import type { Result } from "@/types/result";
import { Card, CardContent } from "../card";

import CompareTextView from "./compareTextView";
import ResultLabel from "./resultLabel";

type Props = {
  className?: string;
  title?: string;
  col?: boolean;
  result: Result;
};

export default function ResultCard({ className = "", result }: Props) {
  return (
    <Card className={`bg-white rounded-none ${className}`}>
      <CardContent className="flex flex-col gap-10">
        <ResultLabel result={result} />
        <CompareTextView
          originalText={result.originalText}
          inputText={result.inputText}
        />
      </CardContent>
    </Card>
  );
}
