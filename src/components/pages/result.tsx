import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ClockIcon, HomeIcon, PlayIcon } from "lucide-react";
import Text from "../ui/text";
import { DiffHighlight } from "../ui/diffHighlight";
import { diffChars } from "diff";
import { Button } from "../ui/button";
import { formatTimer } from "@/lib/timer";

export default function Result() {
  const location = useLocation();
  const { originalText, result, time } = location.state as {
    originalText: string;
    result: string;
    time: number;
  };
  const navigate = useNavigate();

  const diffs = diffChars(originalText, result);
  let count = 0;
  diffs.forEach((part) => {
    if (part.added || part.removed) {
      count += part.value.length;
    }
  });
  const rate = (1 - count / originalText.length) * 100;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl text-center">結果</h1>
      <Card className="w-full bg-white rounded-none">
        <CardContent className=" flex gap-15 items-center pl-10">
          <div>
            <Text leftSection={<ClockIcon className="text-blue-500" />}>
              経過時間
            </Text>
            <p className="text-xl pl-[1rem]">{formatTimer(time)}</p>
          </div>
          <div>
            <Text leftSection={<ClockIcon className="text-blue-500" />}>
              文字数
            </Text>
            <p className="text-xl pl-[1rem]">{originalText.length} 文字</p>
          </div>
          <div>
            <Text leftSection={<ClockIcon className="text-blue-500" />}>
              正確率
            </Text>
            <p className="text-xl pl-[1rem]">{Math.round(rate)} %</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="bg-red-100 w-[1rem] h-[1rem]"></div>
              <p>= 入力ミス</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className=" bg-yellow-100 w-[1rem] h-[1rem]"></div>
              <p>= 未入力</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-10 justify-center">
        <Button
          className="bg-green-400 hover:bg-green-500 text-white w-60 h-12 text-xl"
          onClick={() =>
            navigate("/play", {
              state: { originalText: originalText },
            })
          }
        >
          <PlayIcon />
          <p>もう一度練習する</p>
        </Button>
        <Button
          className="bg-red-400 hover:bg-red-500 text-white  w-60 h-12 text-xl"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
          <p>ホームに戻る</p>
        </Button>
      </div>
      <div className="flex gap-10 min-h-[700px] w-full">
        <div className="flex-1/2">
          <Card className="overflow-hidden pt-0 rounded-none">
            <CardHeader className="bg-blue-400 flex items-center h-20 pl-5">
              <h2 className="text-white text-2xl">見本</h2>
            </CardHeader>
            <CardContent className="ml-5 mr-5 text-[0.85rem] min-h-[700px] border border-solid rounded-md  whitespace-pre-wrap">
              {originalText}
            </CardContent>
          </Card>
        </div>
        <div className="flex-1/2">
          <Card className="overflow-hidden pt-0 rounded-none">
            <CardHeader className="bg-blue-400 flex items-center h-20 pl-5">
              <h2 className="text-white text-2xl">ここに入力</h2>
            </CardHeader>
            <CardContent className="ml-5 mr-5 border border-solid rounded-md">
              <DiffHighlight
                original={originalText}
                input={result}
              ></DiffHighlight>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
