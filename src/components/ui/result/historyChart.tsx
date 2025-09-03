import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  type DotProps,
  ResponsiveContainer,
} from "recharts";
import ResultCard from "./resultCard";
import type { Result } from "@/types/result";

type Props = {
  results: ViewResult[];
};

interface ViewResult extends Result {
  title: string;
}

interface CustomDotProps extends DotProps {
  index: number;
  data: ViewResult[];
}

export default function HistoryChart({ results }: Props) {
  const [targetResult, setTargetResult] = useState<ViewResult | null>(null);
  const [activeTarget, setActiveTarget] = useState("");
  const sortedResults = useMemo(() => {
    return [...results].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [results]);

  useEffect(() => {
    if (sortedResults.length > 0) {
      setTargetResult(sortedResults[sortedResults.length - 1]);
    }
  }, [sortedResults]);

  const CustomDot = ({ cx, cy, index, data }: CustomDotProps) => {
    const point = data[index];
    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={activeTarget === point.title ? 6 : 5}
          fill={activeTarget === point.title ? "orange" : "blue"}
          stroke="#fff"
          strokeWidth={2}
          style={{ cursor: "pointer" }}
        />
        <rect
          x={cx ? cx - 15 : 0}
          y={0}
          width={30}
          height={200}
          fill="transparent"
          onMouseEnter={() => {
            setActiveTarget(point.title);
            setTargetResult(point);
          }}
          style={{ cursor: "pointer" }}
        />
      </>
    );
  };

  return (
    <div className="flex gap-10 min-h-[300px] flex-wrap xl:flex-nowrap">
      <div className="flex-3/5 min-h-[300px]">
        <ResponsiveContainer>
          <LineChart data={sortedResults} style={{ outline: "none" }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis domain={[0, 100]} />
            <Line
              dataKey="accuracy"
              stroke="#3578fc"
              strokeWidth={3}
              dot={(props) => {
                const { key, ...rest } = props;
                return <CustomDot key={key} {...rest} data={sortedResults} />;
              }}
              activeDot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-2/5 min-h-[300px]">
        <ResultCard
          className=" min-h-[300px] rounded-none"
          title={`${targetResult?.title ?? "過去の"}の結果`}
          result={targetResult as Result}
        />
      </div>
    </div>
  );
}
