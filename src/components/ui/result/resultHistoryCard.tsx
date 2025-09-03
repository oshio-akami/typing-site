import type { Result } from "@/types/result";
import { Card, CardContent } from "../card";
import { formatDate } from "@/lib/date";
import { ChevronDownIcon } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import CompareTextView from "./compareTextView";
import ResultLabel from "./resultLabel";

type Props = {
  className?: string;
  title?: string;
  col?: boolean;
  result: Result;
};

export default function ResultHistoryCard({
  className = "",
  title = "結果",
  result,
}: Props) {
  return (
    <Card className={`w-full bg-white rounded-none ${className}`}>
      <CardContent className=" pl-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="group">
            <AccordionTrigger className="flex justify-between items-center w-full border-b-2 pb-5">
              <p className="text-xl lg:text-2xl ">{title}の結果を見る</p>
              <div className="flex">
                <div className="flex  flex-col lg:flex-row">
                  <p>挑戦日時：</p>
                  <p>{result && formatDate(result.date)}</p>
                </div>
                <ChevronDownIcon className="h-[2rem] w-[2rem] transition-transform duration-300 group-data-[state=open]:rotate-180 ml-10" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="overflow-hidden transition-all duration-300 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="flex flex-col gap-5 mt-5">
                <ResultLabel result={result} />
                <CompareTextView
                  originalText={result.originalText}
                  inputText={result.inputText}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
