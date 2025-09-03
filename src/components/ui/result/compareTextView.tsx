import { useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardHeader } from "../card";
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
        <Card className="overflow-hidden pt-0 rounded-none">
          <CardHeader className="bg-primary-400 flex items-center h-20 pl-5">
            <h2 className="text-white text-2xl">見本</h2>
          </CardHeader>
          <CardContent className="ml-5 mr-5 p-5 border border-solid">
            <div className="text-[0.85rem] h-[300px] overflow-y-scroll whitespace-pre-wrap">
              {originalText}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex-2/5">
        <Card className="overflow-hidden pt-0 rounded-none">
          <CardHeader className="bg-primary-400 flex justify-between items-center h-20 pl-5">
            <h2 className="text-white text-2xl">入力</h2>
            <Button
              className="bg-primary-100 hover:bg-primary-50 text-black w-50 h-[60%] p-5"
              onClick={() => setViewHighLight(!viewHighLight)}
            >
              <Text leftSection={<RefreshCcwIcon />}>
                {viewHighLight ? "ハイライト" : "原文"}
              </Text>
            </Button>
          </CardHeader>
          <CardContent className="ml-5 mr-5 p-5 border border-solid">
            {viewHighLight ? (
              <DiffHighlight
                className="text-[0.85rem] h-[300px]"
                original={originalText}
                input={inputText}
              ></DiffHighlight>
            ) : (
              <div className="text-[0.85rem] h-[300px] whitespace-pre-wrap overflow-y-scroll">
                {inputText}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
