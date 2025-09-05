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
      <div className="border-b-2 pb-5 ml-10 mr-10">
        <HistoryChart
          height="300px"
          results={results}
          setTargetResult={setTargetResult}
        />
        <p className="text-right m-0 mr-10">
          ※グラフをクリックして過去の結果を確認できます
        </p>
      </div>
      <p className="text-2xl text-center underline mt-5">
        {targetResult.title}の記録
      </p>
      <ResultCard
        className="outline-none border-none shadow-none"
        result={targetResult}
      />
    </Card>
  );
}
