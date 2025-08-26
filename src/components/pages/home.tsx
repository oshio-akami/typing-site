import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh]">
      <Card className="w-full pl-20 pr-20 rounded-none">
        <CardTitle>
          <h1 className="text-3xl text-center">入力練習アプリ</h1>
        </CardTitle>
        <CardContent className="flex flex-col gap-10">
          <div>
            <h2 className="text-xl font-bold">
              このアプリでは以下のことができます
            </h2>
            <ul className="text-lg">
              <li>
                ・自身で用意した見本文章を利用した入力練習ができるサイトです
              </li>
              <li>・終了後に正答率・入力時間・ミスを確認できます</li>
              <li>・入力した文字の間違いは赤色で表示</li>
              <li>・入力漏れは黄色で表示</li>
            </ul>
          </div>
          <Button
            className="bg-green-400 hover:bg-green-500 text-white w-40 h-12 text-xl"
            onClick={() => navigate("/play", { state: { originalText: "" } })}
          >
            開始する
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
