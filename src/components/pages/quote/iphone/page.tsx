import { useEffect, useState } from "react";
import { deviceData } from "../../../../contents/deviceData";
import Select from "../../../common/select";
import Header from "../../../layout/header";
import PageWrapper from "../../../layout/pageWrapper";
import { getSubsidy } from "../../../../apis";
import PriceSettingField from "../priceSettingField";

const IPhoneQuotePage = () => {
  const [selectedOption, setSelectedOption] = useState<{ name: string } | null>(
    null
  );
  const data = deviceData.apple;
  const [commonDiscounts, setCommonDiscounts] = useState<{
    SKT: number;
    KT: number;
    "LG U+": number;
  }>({
    SKT: 0,
    KT: 0,
    "LG U+": 0,
  });

  // const [agencyPriceList, setAgencyPriceList] = useState();

  const fetchPriceData = async () => {
    // API를 통해 해당 판매점의 가격 데이터를 불러오고 반영함.
  };

  useEffect(() => {
    const fetchCommonDiscount = async () => {
      let amounts = commonDiscounts;
      try {
        await Promise.all(
          ["SKT", "KT", "LG U+"].map(async (telecom) => {
            const amount = await getSubsidy(telecom);
            amounts[telecom as keyof typeof commonDiscounts] = amount;
          })
        );
        console.log("Fetched common discounts:", amounts);
        setCommonDiscounts(amounts);
      } catch (error) {
        console.error("Failed to fetch common discount:", error);
      }
    };

    fetchCommonDiscount();

    fetchPriceData();
  }, []);

  return (
    <>
      <Header />
      <PageWrapper className="flex flex-col gap-4">
        <Select.Group
          selectedOption={selectedOption}
          onChange={setSelectedOption}
        >
          {data.map((device) => (
            <Select.Option key={device.phoneName} name={device.phoneName} />
          ))}
        </Select.Group>
        {selectedOption && (
          <>
            <PriceSettingField
              device={selectedOption.name}
              telecom="SKT"
              originalPrice={1234567}
              commonDiscount={commonDiscounts["SKT"]}
              options={[
                { plan: "", type: "기기변경", price: 0 },
                { plan: "", type: "번호이동", price: 0 },
                { plan: "", type: "신규가입", price: 0 },
              ]}
            />
            <PriceSettingField
              device={selectedOption.name}
              telecom="KT"
              originalPrice={1234567}
              commonDiscount={commonDiscounts["KT"]}
              options={[
                { plan: "", type: "기기변경", price: 0 },
                { plan: "", type: "번호이동", price: 0 },
                { plan: "", type: "신규가입", price: 0 },
              ]}
            />
            <PriceSettingField
              device={selectedOption.name}
              telecom="LG U+"
              originalPrice={1234567}
              commonDiscount={commonDiscounts["LG U+"]}
              options={[
                { plan: "", type: "기기변경", price: 0 },
                { plan: "", type: "번호이동", price: 0 },
                { plan: "", type: "신규가입", price: 0 },
              ]}
            />
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default IPhoneQuotePage;
