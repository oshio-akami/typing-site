import { useInView } from "@/hooks/useInView";
import type { Result } from "@/types/result";
import { Card, CardContent, CardHeader } from "../card";
import ProgressRing from "../progressRing";
import { formatDate } from "@/lib/date";
import { formatTimer } from "@/lib/timer";
import Text from "../text";
import {
  ClockIcon,
  HelpCircleIcon,
  PencilIcon,
  XCircleIcon,
} from "lucide-react";

import CompareTextView from "./compareTextView";
import ResultLabel from "./resultLabel";

type Props = {
  className?: string;
  title?: string;
  col?: boolean;
  result: Result;
};

export default function ResultCard({
  className = "",
  title = "結果",
  col = true,
  result,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return col ? (
    <Card className={className} ref={ref}>
      <CardHeader className="border-b-2 flex justify-between">
        <p className="text-2xl">{title}</p>
        <div className="flex">
          <p>挑戦日時：</p>
          <p>{result && formatDate(result.date)}</p>
        </div>
      </CardHeader>
      <CardContent className="gap-0">
        <div className="flex gap-10">
          <div>
            <ProgressRing
              className="h-30 w-30"
              progress={result ? result.accuracy : 0}
              inView={inView}
              strokeColor="#f0db4f"
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-1 gap-y-1 text-lg">
            <Text leftSection={<ClockIcon className="text-secondary-500" />}>
              経過時間
            </Text>
            <p className="mt-auto mb-auto pl-5 md:pl-0">
              ： {result && formatTimer(result.timeInSeconds)}
            </p>
            <Text leftSection={<PencilIcon className="text-secondary-500" />}>
              文字数
            </Text>
            <p className="mt-auto mb-auto pl-5 md:pl-0">
              ： {result && result.originalText.length}文字
            </p>
            <Text leftSection={<XCircleIcon className="text-secondary-500" />}>
              入力ミス
            </Text>
            <p className="mt-auto mb-auto pl-5 md:pl-0">
              ：{result && result.missTakeCount}文字
            </p>
            <Text
              leftSection={<HelpCircleIcon className="text-secondary-500" />}
            >
              入力漏れ
            </Text>
            <p className="mt-auto mb-auto pl-5 md:pl-0">
              ：{result && result.omissionCount}文字
            </p>
            <Text
              leftSection={<HelpCircleIcon className="text-secondary-500" />}
            >
              余計な入力
            </Text>
            <p className="mt-auto mb-auto pl-5 md:pl-0">
              ：{result && result.insertionCount}文字
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card className={`w-full bg-white rounded-none ${className}`}>
      <CardContent className=" pl-10 flex flex-col gap-10">
        <ResultLabel result={result} />
        <CompareTextView
          originalText={result.originalText}
          inputText={result.inputText}
        />
      </CardContent>
    </Card>
  );
}
