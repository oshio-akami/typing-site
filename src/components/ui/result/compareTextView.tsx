import { useState } from "react";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import { DiffHighlight } from "./diffHighlight";
import Text from "../text";
import { RefreshCcwIcon } from "lucide-react";

type Props = {
  originalText: string;
  inputText: string;
};

export default function CompareTextView({ originalText, inputText }: Props) {
  const [viewHighLight, setViewHighLight] = useState(true);
  return (
    <div className="flex flex-col lg:flex-row gap-10  w-full">
      <div className="flex-2/5">
        <p className="text-2xl h-10">見本の文章</p>
        <Card className="overflow-hidden gap-0 pt-0  border-1 border-gray-100 bg-gray-50">
          <CardContent className="m-0 p-5">
            <div className=" pr-2 text-[1rem] h-[300px] overflow-y-scroll whitespace-pre-wrap">
              {originalText}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex-2/5">
        <div className="flex justify-between items-center h-10">
          <p className="text-2xl h-10">入力した文章</p>
          <Button
            className="border-1 border-secondary-300 bg-white hover:bg-gray-50 text-black w-30 h-8"
            onClick={() => setViewHighLight(!viewHighLight)}
          >
            <Text leftSection={<RefreshCcwIcon />}>
              {viewHighLight ? "比較表示" : "原文表示"}
            </Text>
          </Button>
        </div>
        <Card className="overflow-hidden gap-0 pt-0  border-1 border-secondary-100 bg-blue-50">
          <CardContent className="m-0 p-5">
            {viewHighLight ? (
              <DiffHighlight
                className="text-[1rem] h-[300px] "
                original={originalText}
                input={inputText}
              ></DiffHighlight>
            ) : (
              <div className="pr-2 text-[1rem] h-[300px] whitespace-pre-wrap overflow-y-scroll">
                {inputText}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
