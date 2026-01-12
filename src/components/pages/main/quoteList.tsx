import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ArrowIcon from "../../icons/arrow";
import { cn } from "cn-func";
import { quoteInfo } from "../../../apis";

interface QuoteListProps {
  quotes: quoteInfo[];
  selectedQuoteCode: string;
  setSelectedQuoteCode: React.Dispatch<React.SetStateAction<string>>;
}

const QuoteList = ({
  quotes,
  selectedQuoteCode,
  setSelectedQuoteCode,
}: QuoteListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 5명씩

  // 1. 검색 필터링 로직
  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.customerName.includes(searchTerm) ||
      quote.quoteCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 검색어가 바뀔 때마다 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // 2. 페이지네이션 계산
  const totalPages = Math.max(
    Math.ceil(filteredQuotes.length / itemsPerPage),
    1
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuotes.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 이동 함수
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col gap-5 w-[420px] p-6 bg-white rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-50 min-h-[600px]">
      {/* 제목 영역 */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-blue-primary rounded-md flex items-center justify-center">
          <div className="w-3 h-0.5 bg-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">발급 견적 현황</h2>
      </div>

      {/* 검색창 */}
      <div className="relative flex items-center">
        <Search size={18} className="absolute left-4 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="견적 코드를 입력해주세요."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-primary placeholder:text-gray-300 text-sm transition-all"
        />
      </div>

      {/* 견적 리스트 영역 (5명 표시) */}
      <div className="flex flex-col gap-3 h-[460px]">
        {currentItems.length > 0 ? (
          currentItems.map((quote) => (
            <div
              key={quote.quoteId}
              onClick={() => setSelectedQuoteCode(quote.quoteCode)}
              className={cn(
                "flex flex-row justify-between items-center px-5 py-4 border rounded-2xl cursor-pointer transition-all",
                selectedQuoteCode === quote.quoteCode
                  ? "border-blue-primary bg-blue-50/40 shadow-sm"
                  : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold text-gray-700">
                  {quote.customerName}
                  <span className="ml-1 text-gray-500 font-medium">
                    ({quote.costomerPhoneNumber})
                  </span>
                </p>
              </div>

              {/* 방문 여부에 따른 상태 배지 */}
              <div
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold w-20 text-center",
                  quote.isUserVisit
                    ? "bg-[#EBF2FF] text-blue-primary"
                    : "bg-[#F5F6F7] text-[#9EA4AA]"
                )}
              >
                {quote.isUserVisit ? "완료" : "방문 예정"}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            데이터가 존재하지 않습니다.
          </div>
        )}
      </div>

      {/* 하단 페이지네이션 (직전의 '현재/전체' 방식) */}
      <div className="flex justify-center items-center gap-6 text-gray-dark mt-auto pt-4 border-t border-gray-50">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={cn(
            "p-2 rounded-full transition-colors",
            currentPage === 1
              ? "opacity-20 cursor-not-allowed"
              : "hover:bg-gray-100"
          )}
        >
          <ArrowIcon direction="left" size={18} />
        </button>

        <div className="flex items-center gap-1.5 font-bold">
          <span className="text-blue-primary text-base">{currentPage}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500 text-base">{totalPages}</span>
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={cn(
            "p-2 rounded-full transition-colors",
            currentPage === totalPages
              ? "opacity-20 cursor-not-allowed"
              : "hover:bg-gray-100"
          )}
        >
          <ArrowIcon direction="right" size={18} />
        </button>
      </div>
    </div>
  );
};

export default QuoteList;
