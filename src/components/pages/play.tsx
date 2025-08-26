import { useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { ClockIcon, PlayIcon, RotateCcwIcon, SquareIcon } from "lucide-react";
import Text from "../ui/text";
import { formatTimer } from "@/lib/timer";

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

  return (
    <div className="flex flex-col gap-5">
      <Card className="w-full bg-white rounded-none">
        <CardContent className=" flex gap-10 items-center pl-10">
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
        </CardContent>
      </Card>
      <div className="flex gap-10 justify-center ">
        <Button
          className="bg-green-400 hover:bg-green-500 text-white w-40 h-12 text-xl"
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
          className="bg-red-400 hover:bg-red-500 text-white  w-40 h-12 text-xl"
          onClick={() =>
            navigate("/result", {
              state: {
                originalText: originalText,
                result: inputRef.current?.value ?? "",
                time: time,
              },
            })
          }
          disabled={!isRunning}
        >
          <SquareIcon />
          <p>終了</p>
        </Button>
        <Button
          className="bg-gray-500 hover:bg-gray-600 text-white  w-40 h-12 text-xl"
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
      </div>
      <div className="flex gap-10 min-h-[700px] w-full">
        <div className="flex-1/2">
          <Card className="overflow-hidden pt-0  rounded-none">
            <CardHeader className="bg-blue-400 flex items-center h-20 pl-5">
              <h2 className="text-white text-2xl">見本</h2>
            </CardHeader>
            <CardContent>
              <Textarea
                className="bg-white min-h-[700px] resize-none disabled:opacity-100 outline-none focus-visible:ring-0 rounded-none"
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
            <CardHeader className="bg-blue-400 flex items-center h-20 pl-5">
              <h2 className="text-white text-2xl">ここに入力</h2>
            </CardHeader>
            <CardContent>
              <Textarea
                ref={inputRef}
                className="bg-white min-h-[700px] resize-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                placeholder="ここに入力"
                disabled={!isRunning}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
