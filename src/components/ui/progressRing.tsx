import { useEffect, useState } from "react";

type Props = {
  progress?: number;
  strokeColor?: string;
  className?: string;
  inView: boolean;
};

export default function ProgressRing({
  progress = 100,
  strokeColor = "black",
  className = "",
  inView,
}: Props) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const centerCircleRadius = radius - strokeWidth / 2;
  const [animationProgress, setAnimationProgress] = useState(0);
  const offset = circumference * (1 - animationProgress / 100);

  const ease = (x: number) => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };
  useEffect(() => {
    if (inView) {
      let start: number | null = null;
      const duration = 1500;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const x = Math.min(elapsed / duration, 1);
        const easedT = ease(x);
        setAnimationProgress(easedT * progress);
        if (elapsed < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  }, [inView, progress]);

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="100%"
        className="block transform -rotate-90 m-0 p-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          fill="#2c3e50"
          r={centerCircleRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <text
          x={size / 2}
          y={size / 2 + 3}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={centerCircleRadius * 0.6}
          fontWeight="bold"
          transform={`rotate(90 ${size / 2} ${size / 2})`}
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}
