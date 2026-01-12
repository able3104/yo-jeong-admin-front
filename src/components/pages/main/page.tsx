import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";
import PageWrapper from "../../layout/pageWrapper";
import QuoteDetail from "./quoteDetail";
import QuoteInfo from "./quoteInfo";
import QuoteList from "./quoteList";
import { getStatusAgencyApi, getStatusAgencyResponse } from "../../../apis";

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [statusAgency, setStatusAgency] =
    useState<getStatusAgencyResponse | null>(null);
  const [selectedQuoteCode, setSelectedQuoteCode] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getStatusAgencyApi();
        setStatusAgency(data);

        // 데이터가 있다면 첫 번째 항목을 자동으로 선택
        if (data.quotes && data.quotes.length > 0) {
          setSelectedQuoteCode(data.quotes[0].quoteCode);
        }
      } catch (error) {
        console.error("현황 데이터 로딩 실패");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (isLoading)
    return <div className="p-20 text-center">데이터를 불러오는 중...</div>;

  return (
    <>
      <Header />
      <PageWrapper className="flex flex-col gap-5">
        <QuoteInfo statusAgency={statusAgency} />
        <div className="flex flex-row gap-5">
          {/* 서버에서 받아온 실제 quotes 배열 전달 */}
          <QuoteList
            quotes={statusAgency?.quotes || []}
            selectedQuoteCode={selectedQuoteCode}
            setSelectedQuoteCode={setSelectedQuoteCode}
          />
          <QuoteDetail selectedQuoteCode={selectedQuoteCode} />
        </div>
      </PageWrapper>
    </>
  );
};

export default MainPage;
