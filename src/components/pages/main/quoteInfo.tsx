const QuoteInfo = () => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl p-5">
      <h2 className="text-xl font-semibold">견적 현황</h2>
      <div className="flex flex-row gap-4">
        <div className="flex-1 flex flex-col items-center gap-2 p-4 bg-blue-tertiary rounded-xl">
          <p className="text-2xl font-medium">견적서 발급 현황</p>
          <p className="text-3xl text-blue-primary font-semibold">120건</p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 p-4 bg-blue-tertiary rounded-xl">
          <p className="text-2xl font-medium">완료된 견적</p>
          <p className="text-3xl text-blue-primary font-semibold">30건</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteInfo;
