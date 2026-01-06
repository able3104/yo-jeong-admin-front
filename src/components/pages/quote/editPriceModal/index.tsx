import { useAtomValue, useSetAtom } from "jotai";
import { editPriceModalAtom, EditPriceModalCloseAtom } from "./atom";
import { cn } from "cn-func";
import { useMemo, useState } from "react";
import { phonePlans } from "../../../../contents/phonePlans";

const EditPriceModal = () => {
  const { isOpen, device, telecom, originalPrice, commonDiscount, option } =
    useAtomValue(editPriceModalAtom);
  const closeModal = useSetAtom(EditPriceModalCloseAtom);

  const _phonePlans = phonePlans[telecom as keyof typeof phonePlans] || [];

  const options = _phonePlans.map((value) => value.price) || [];
  const [selectedOption, setSelectedOption] = useState<{ name: string } | null>(
    null
  );

  const [salesDiscount, setSalesDiscount] = useState<string>("");
  const salesDiscountNumber = useMemo(() => {
    return Number(salesDiscount.replace(/[^0-9]/g, ""));
  }, [salesDiscount]);

  const handleSalesDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // 숫자만 입력받도록 필터링
    const filteredValue = Number(value.replace(/[^0-9]/g, "")).toLocaleString(
      "ko-KR"
    );
    setSalesDiscount(filteredValue);
  };

  const handleSubmit = async () => {
    // 등록 버튼 클릭 시 입력된 데이터를 저장하고 모달을 닫아야함.
    closeModal();
  };

  if (!isOpen) return null;
  return (
    <>
      <div
        className={cn("fixed inset-0 z-130", "bg-black/10 p-4")}
        onClick={closeModal}
      />
      <div
        className={cn(
          "fixed top-1/2 left-1/2 z-140",
          "-translate-x-1/2 -translate-y-1/2",
          "flex flex-col gap-5",
          "w-full max-w-[50rem] p-6 bg-white",
          "rounded-2xl"
        )}
      >
        <h2 className="text-2xl font-semibold text-center">판매 가격 등록</h2>
        <InputField label="선택하신 기종">
          <div className="grid grid-cols-3 gap-4 text-lg text-center text-gray-dark font-medium">
            <span className="p-2 bg-blue-tertiary rounded-lg">{device}</span>
            <span className="p-2 bg-blue-tertiary rounded-lg">{telecom}</span>
            <span className="p-2 bg-blue-tertiary rounded-lg">
              {option?.type}
            </span>
          </div>
        </InputField>
        <InputField label="1. 요금제 선택">
          <div className="flex gap-4 text-xl font-medium">
            {options.map((planPrice) => (
              <button
                key={planPrice}
                className={cn(
                  "flex-1 p-2 rounded-lg border border-gray-light",
                  "duration-200",
                  selectedOption?.name === planPrice.toString()
                    ? "bg-blue-primary text-white"
                    : "bg-white hover:bg-gray-background"
                )}
                onClick={() =>
                  setSelectedOption({ name: planPrice.toString() })
                }
              >
                {planPrice.toLocaleString("ko-KR")}원
              </button>
            ))}
          </div>
        </InputField>
        <InputField label="2. 지원금 입력">
          <PriceField label="단말기 출고가">
            <div className="border border-gray-light rounded-lg px-3 py-2">
              {originalPrice.toLocaleString("ko-KR")}원
            </div>
          </PriceField>
          <PriceField label="공통 지원금">
            <div className="border border-gray-light rounded-lg px-3 py-2">
              {commonDiscount.toLocaleString("ko-KR")}원
            </div>
          </PriceField>
          <PriceField label="판매점 지원금">
            <input
              type="text"
              maxLength={9}
              className="border border-gray-light rounded-lg px-3 py-2 w-full"
              value={salesDiscount}
              onChange={handleSalesDiscountChange}
            />
          </PriceField>
          <PriceField label="최종 단말기 가격">
            <div className="border border-gray-light rounded-lg px-3 py-2">
              {(
                originalPrice -
                commonDiscount -
                salesDiscountNumber
              ).toLocaleString("ko-KR")}
              원
            </div>
          </PriceField>
        </InputField>
        <div className="flex gap-4">
          <button
            className="w-full bg-white text-gray-dark p-3 border border-gray-light rounded-lg text-lg font-medium"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-full bg-blue-primary text-white p-3 rounded-lg text-lg font-medium"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
};

const InputField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-xl font-semibold">{label}</label>
      {children}
    </div>
  );
};

const PriceField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      <label className="text-lg text-center font-medium text-gray-dark">
        {label}
      </label>
      <span className="col-span-2">{children}</span>
    </div>
  );
};

export default EditPriceModal;
