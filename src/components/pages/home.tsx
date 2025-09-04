import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { getResults } from "@/lib/localStorage/results";
import ResultHistoryCard from "../ui/result/resultHistoryCard";

export default function Home() {
  const navigate = useNavigate();
  const results = getResults();
  const viewResults = results.map((result, index) => ({
    ...result,
    title: index === 0 ? "前回" : `${index + 1}回前`,
  }));
  return (
    <div className="wrapper">
      <div className="min-h-[100vh]">
        <h1 className="text-3xl text-center font-bold mb-10">入力練習アプリ</h1>
        <Card className="w-full pl-20 pr-20 rounded-none">
          <CardContent className="flex flex-col gap-10">
            <div>
              <h2 className="text-xl font-bold">
                このアプリでは以下のことができます
              </h2>
              <ul className="text-lg">
                <li>ご自身で用意した文章を使ってタイピング練習ができます。</li>
                <li>終了後には、正答率、入力時間、ミスの確認できます。</li>
                <li>ミスは色でハイライト表示されます。</li>
                <li>過去の結果は10件まで保存されます。</li>
              </ul>
            </div>
            <Button
              className="bg-primary-400 hover:bg-primary-500 text-white w-40 h-12 text-xl"
              onClick={() => navigate("/play", { state: { originalText: "" } })}
            >
              開始する
            </Button>
          </CardContent>
        </Card>
        <p className="text-3xl text-center mb-5 mt-5">過去の結果</p>
        <ResultHistoryCard results={viewResults} />
      </div>
    </div>
  );
}
