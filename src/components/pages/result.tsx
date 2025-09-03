import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { HomeIcon, PlayIcon } from "lucide-react";
import { Button } from "../ui/button";
import HistoryChart from "../ui/result/historyChart";
import ResultCard from "../ui/result/resultCard";
import type { Result } from "@/types/result";
import { getResults } from "@/lib/localStorage/results";
import ResultHistoryCard from "../ui/result/resultHistoryCard";
import { useEffect } from "react";

export default function Result() {
  const location = useLocation();
  const result: Result | undefined = location.state?.result;
  const navigate = useNavigate();
  useEffect(() => {
    if (result === undefined) {
      navigate("/");
    }
  }, [result, navigate]);
  if (result === undefined) {
    return null;
  }

  const results = getResults();
  const resultHistories = [...results].slice(1, results.length);

  const resultCards = resultHistories.map((result, index) => {
    const title = index === 0 ? "前回" : `${index + 1}回前`;

    return (
      <ResultHistoryCard
        key={index}
        className="mb-5 shadow-md border-2"
        title={title}
        result={result}
      />
    );
  });
  const viewResults = [...results]
    .map((result, index) => ({
      ...result,
      title: index === 0 ? "今回" : index === 1 ? "前回" : `${index}回前`,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="wrapper">
      <div className="flex flex-col gap-5 mb-5">
        <div>
          <p className="text-3xl text-center mb-5 font-bold">タイピング結果</p>
          <ResultCard col={false} result={result} />
        </div>
        <div className="flex gap-10 justify-center ">
          <Button
            className="bg-primary-400 hover:bg-primary-500 text-white flex-1/2 h-12 text-xl"
            onClick={() =>
              navigate("/play", {
                state: { originalText: result.originalText },
              })
            }
          >
            <PlayIcon />
            <p>もう一度挑戦する</p>
          </Button>
          <Button
            className="bg-primary-400 hover:bg-primary-500 text-white  flex-1/2 h-12 text-xl"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
            <p>ホームに戻る</p>
          </Button>
        </div>
        <div>
          <p className="text-3xl text-center mt-5 mb-5 font-bold">過去の結果</p>

          <Card className="w-full bg-white rounded-none p-3 mb-5">
            <HistoryChart results={viewResults} />
          </Card>
          {resultCards}
        </div>
      </div>
    </div>
  );
}
