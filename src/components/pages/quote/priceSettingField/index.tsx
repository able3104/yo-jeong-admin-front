import { cn } from "cn-func";
import { useSetAtom } from "jotai";
import { EditPriceModalOpenAtom } from "../editPriceModal/atom";

interface PriceSettingFieldProps {
  telecom: string;
  device: string;
  originalPrice: number;
  commonDiscount: number;
  options: {
    type: string; // 가입 유형으로 기기변경, 번호이동, 신규가입 으로 제한됨
    plan: string; // 요금제 종류(115군, 105군, 95군 으로 제한됨)
    price: number; // 단말기 가격(공통지원금, 판매점 지원금을 뺀 금액으로 계산됨.)
  }[];
}

interface PriceEditProps {
  telecom: string;
  device: string;
  option: {
    type: string;
    plan: string;
    price: number;
  };
}

const PriceSettingField = ({
  telecom,
  device,
  originalPrice,
  commonDiscount,
  options,
}: PriceSettingFieldProps) => {
  const modalOpen = useSetAtom(EditPriceModalOpenAtom);

  const handleEdit = ({ telecom, device, option }: PriceEditProps) => {
    // 편집 버튼 클릭 시 모달을 열고, 해당 옵션에 대한 정보를 저장해야함.
    modalOpen({
      telecom,
      device,
      option,
      commonDiscount,
      originalPrice,
    });
    console.log("Edit clicked for", telecom, device, option);
  };
  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-white">
      <div className="bg-blue-secondary p-2 text-xl font-bold text-center">
        {telecom}
      </div>
      <div className="flex flex-col gap-3 p-4">
        <OptionGrid className="py-1 font-medium">
          <span>가입 유형</span>
          <span>요금제</span>
          <span>단말기 가격</span>
        </OptionGrid>
        {options.map((option) => (
          <div
            className="bg-blue-tertiary rounded-lg overflow-hidden text-base"
            key={`${option.plan}-${option.type}`}
          >
            <OptionGrid>
              <span>{option.type}</span>
              <span>{option.plan === "" ? "-" : option.plan}</span>
              <div>
                {option.price === 0
                  ? "-"
                  : `${option.price.toLocaleString("ko-KR")}원`}
              </div>
              <button
                className="text-blue-primary"
                onClick={() => handleEdit({ telecom, device, option })}
              >
                편집
              </button>
            </OptionGrid>
          </div>
        ))}
      </div>
    </div>
  );
};

const OptionGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_1fr_1fr_52px] gap-4",
        "px-4 py-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PriceSettingField;
