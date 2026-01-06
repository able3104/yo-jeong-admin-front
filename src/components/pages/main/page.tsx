import { useState } from "react";
import Header from "../../layout/header";
import PageWrapper from "../../layout/pageWrapper";
import QuoteDetail from "./quoteDetail";
import QuoteInfo from "./quoteInfo";
import QuoteList from "./quoteList";

const MainPage = () => {
  const [selectedQuoteCode, setSelectedQuoteCode] = useState<string>("");
  return (
    <>
      <Header />
      <PageWrapper className="flex flex-col gap-5">
        <QuoteInfo />
        <div className="flex flex-row gap-5">
          <QuoteList
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
