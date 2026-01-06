import { Search } from "lucide-react";
import ArrowIcon from "../../icons/arrow";
import { cn } from "cn-func";

const quoteData = [
  {
    quoteCode: "Q20230901-001",
    customerName: "홍길동",
    phone: "010-1234-5678",
    state: "방문 예정",
  },
  {
    quoteCode: "Q20230901-002",
    customerName: "김철수",
    phone: "010-2345-6789",
    state: "완료",
  },
  {
    quoteCode: "Q20230901-003",
    customerName: "이영희",
    phone: "010-3456-7890",
    state: "방문 예정",
  },
  {
    quoteCode: "Q20230901-004",
    customerName: "박민수",
    phone: "010-4567-8901",
    state: "방문 예정",
  },
  {
    quoteCode: "Q20230901-005",
    customerName: "최수진",
    phone: "010-5678-9012",
    state: "완료",
  },
];

interface QuoteListProps {
  selectedQuoteCode: string;
  setSelectedQuoteCode: React.Dispatch<React.SetStateAction<string>>;
}

const QuoteList = ({
  selectedQuoteCode,
  setSelectedQuoteCode,
}: QuoteListProps) => {
  return (
    <div className="flex flex-col gap-4 w-[360px] p-5 bg-white rounded-2xl">
      <h2 className="text-xl font-semibold">발급 견적 현황</h2>
      <div className="flex items-center gap-2 px-3 py-2 border border-gray-light rounded-lg">
        <Search size={16} className="text-gray-dark" />
        <input
          placeholder="견적 코드를 입력해주세요."
          className="outline-none placeholder:text-gray-dark flex-1"
        />
      </div>
      <div className="flex flex-col gap-3">
        {/* 여기 사람들 나올꺼임 */}
        {quoteData.map((quote) => (
          <div
            key={quote.quoteCode}
            onClick={() => setSelectedQuoteCode(quote.quoteCode)}
            className={cn(
              "flex flex-row justify-between items-center",
              "px-4 py-3 border border-gray-light rounded-lg cursor-pointer",
              selectedQuoteCode === quote.quoteCode && "border-blue-primary"
            )}
          >
            <p className="text-base">{`${quote.customerName} (${quote.phone})`}</p>
            <p
              className={cn(
                "w-20 rounded-sm p-0.5 text-center text-[13px]",
                quote.state === "완료"
                  ? "bg-blue-tertiary text-blue-primary"
                  : "bg-gray-background text-gray-dark"
              )}
            >
              {quote.state}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 text-gray-dark">
        <button className="p-2">
          <ArrowIcon direction="left" size={20} />
        </button>
        <span className="text-base font-medium">1 / 10</span>
        <button className="p-2">
          <ArrowIcon direction="right" size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuoteList;
