import {
  ClockIcon,
  HelpCircleIcon,
  PencilIcon,
  RefreshCcwIcon,
  XCircleIcon,
} from "lucide-react";
import ProgressRing from "../progressRing";
import type { Result } from "@/types/result";
import Text from "../text";
import { Button } from "../button";
import { formatTimer } from "@/lib/timer";
import { useNavigate } from "react-router-dom";

type Props = {
  result: Result;
  className?: string;
};

export default function ResultLabel({ result, className = "" }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex gap-x-10 gap-y-5 items-center  flex-wrap ${className}`}
    >
      <div>
        <ProgressRing
          className="h-30 w-30"
          progress={result.accuracy}
          inView={true}
          strokeColor="#f0db4f"
        />
      </div>
      <div>
        <Text leftSection={<ClockIcon className="text-blue-500" />}>
          経過時間
        </Text>
        <p className="text-xl pl-[1rem]">{formatTimer(result.timeInSeconds)}</p>
      </div>
      <div>
        <Text leftSection={<PencilIcon className="text-blue-500" />}>
          文字数
        </Text>
        <p className="text-xl pl-[1rem]">{result.originalText.length}文字</p>
      </div>
      <div>
        <Text leftSection={<XCircleIcon className="text-secondary-500" />}>
          入力ミス
        </Text>
        <p className="text-xl pl-[1rem]">{result.missTakeCount}文字</p>
      </div>
      <div>
        <Text leftSection={<HelpCircleIcon className="text-secondary-500" />}>
          入力漏れ
        </Text>
        <p className="text-xl pl-[1rem]">{result.omissionCount}文字</p>
      </div>
      <div>
        <Text leftSection={<HelpCircleIcon className="text-secondary-500" />}>
          余計な入力
        </Text>
        <p className="text-xl pl-[1rem]">{result.insertionCount}文字</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <div className="flex ">
            <div className="bg-yellow-100 w-[1rem] h-[1rem]"></div>
            <div className="bg-red-100 w-[1rem] h-[1rem]"></div>
          </div>
          <p>= 入力ミス</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className=" bg-yellow-100 w-[1rem] h-[1rem]"></div>
          <p>= 入力漏れ</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className=" bg-red-100 w-[1rem] h-[1rem]"></div>
          <p>= 余計な入力</p>
        </div>
      </div>
      <Button
        onClick={() =>
          navigate("/play", {
            state: { originalText: result.originalText },
          })
        }
        className=" bg-primary-400 hover:bg-primary-500 text-white  w-70 h-12 text-xl"
      >
        <RefreshCcwIcon />
        <p>もう一度挑戦する</p>
      </Button>
    </div>
  );
}
