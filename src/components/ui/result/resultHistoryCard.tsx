import type { ViewResult } from "@/types/result";
import { Card } from "../card";
import HistoryChart from "./historyChart";
import ResultCard from "./resultCard";
import { useState } from "react";

type Props = {
  className?: string;
  results: ViewResult[];
};

export default function ResultHistoryCard({ className = "", results }: Props) {
  const [targetResult, setTargetResult] = useState<ViewResult>(results[0]);
  return (
    <Card className={`w-full gap-0 bg-white rounded-none ${className}`}>
      <HistoryChart
        height="300px"
        className="pl-5 pr-5"
        results={results}
        setTargetResult={setTargetResult}
      />
      <p className="text-right m-0 mr-10">
        ※グラフをクリックして過去の結果を確認できます
      </p>
      <p className="text-2xl text-center underline">
        {targetResult.title}の記録
      </p>
      <ResultCard
        className="outline-none border-none shadow-none"
        result={targetResult}
      />
    </Card>
  );
}
