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
import type { ViewResult } from "@/types/result";

type Props = {
  className?: string;
  height: string;
  results: ViewResult[];
  setTargetResult: (result: ViewResult) => void;
};

interface CustomDotProps extends DotProps {
  index: number;
  data: ViewResult[];
}

export default function HistoryChart({
  className = "",
  height,
  results,
  setTargetResult,
}: Props) {
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
  }, [sortedResults, setTargetResult]);

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
          height={height}
          fill="transparent"
          onClick={() => {
            setActiveTarget(point.title);
            setTargetResult(point);
          }}
          style={{ cursor: "pointer" }}
        />
      </>
    );
  };

  return (
    <div className={`h-[${height}] ${className}`}>
      <ResponsiveContainer>
        <LineChart data={sortedResults} style={{ outline: "none" }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
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
  );
}
