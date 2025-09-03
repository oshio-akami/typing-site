import { useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  ClockIcon,
  HomeIcon,
  PencilIcon,
  PlayIcon,
  RotateCcwIcon,
  SquareIcon,
} from "lucide-react";
import Text from "../ui/text";
import { formatTimer } from "@/lib/timer";
import { getDiffs } from "@/lib/diff";
import type { Result } from "@/types/result";
import { saveResult } from "@/lib/localStorage/results";

export default function Play() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const { originalText } = location.state as {
      originalText: string;
    };
    setOriginalText(originalText ?? "");
  }, [location.state]);

  const getResult = (): Result => {
    const { accuracy, missTakeCount, omissionCount, insertionCount } = getDiffs(
      originalText,
      inputRef.current?.value ?? ""
    );
    return {
      date: new Date(),
      timeInSeconds: time,
      originalText: originalText,
      inputText: inputRef.current?.value ?? "",
      accuracy: accuracy,
      missTakeCount: missTakeCount,
      omissionCount: omissionCount,
      insertionCount: insertionCount,
    };
  };

  return (
    <div className="wrapper">
      <div className="flex flex-col gap-5">
        <Card className="w-full bg-white rounded-none">
          <CardContent className=" flex gap-10 items-center pl-10">
            <div>
              <p>１．まずは、見本となる文章を入力してください。</p>
              <p>２．「開始」ボタンを押すと、タイマーがスタートします。</p>
              <p>
                ３．タイマーが始まったら、右側の入力スペースに見本の文章をタイプします。
              </p>
              <p>
                ４．入力が終わったら「終了」ボタンを押してください。正確性やミスした箇所などの結果が表示されます。
              </p>
            </div>
            <div>
              <Text leftSection={<ClockIcon className="text-blue-500" />}>
                経過時間
              </Text>
              <p className="text-xl pl-[1rem]">{formatTimer(time)}</p>
            </div>
            <div>
              <Text leftSection={<PencilIcon className="text-blue-500" />}>
                文字数
              </Text>
              <p className="text-xl pl-[1rem]">{originalText.length} 文字</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-10 justify-center ">
          <Button
            className="bg-primary-400 hover:bg-primary-500 text-white w-40 h-12 text-xl"
            onClick={() => {
              inputRef.current?.focus();
              setIsRunning(true);
            }}
            disabled={isRunning || originalText === ""}
          >
            <PlayIcon />
            <p>{isRunning ? "計測中" : "開始"}</p>
          </Button>
          <Button
            className="bg-primary-400 hover:bg-primary-500 text-white  w-40 h-12 text-xl"
            onClick={() => {
              const result = getResult();
              navigate("/result", {
                state: {
                  result: result,
                },
              });
              saveResult(result);
            }}
            disabled={!isRunning}
          >
            <SquareIcon />
            <p>終了</p>
          </Button>
          <Button
            className="bg-primary-400 hover:bg-primary-500 text-white  w-40 h-12 text-xl"
            onClick={() => {
              setTime(0);
              if (inputRef.current?.value) {
                inputRef.current.value = "";
              }
              setIsRunning(false);
            }}
          >
            <RotateCcwIcon />
            <p>リセット</p>
          </Button>
          <Button
            className="bg-primary-400 hover:bg-primary-500 text-white  w-40 h-12 text-xl"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
            <p>ホームに戻る</p>
          </Button>
        </div>
        <div className="flex gap-10 h-[600px] w-full">
          <div className="flex-1/2">
            <Card className="overflow-hidden pt-0  rounded-none">
              <CardHeader className="bg-primary-500 flex items-center h-20 pl-5">
                <h2 className="text-white text-2xl">見本</h2>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="bg-white h-[500px] resize-none disabled:opacity-100 outline-none focus-visible:ring-0 rounded-none"
                  placeholder="ここに見本を入力"
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  disabled={isRunning}
                ></Textarea>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1/2">
            <Card className="overflow-hidden pt-0  rounded-none">
              <CardHeader className="bg-primary-500 flex items-center h-20 pl-5">
                <h2 className="text-white text-2xl">ここに入力</h2>
              </CardHeader>
              <CardContent>
                <Textarea
                  ref={inputRef}
                  className="bg-white min-h-[500px] resize-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                  placeholder="ここに入力"
                  disabled={!isRunning}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
