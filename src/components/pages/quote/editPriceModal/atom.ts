import { atom } from "jotai";

interface EditPriceModalState {
  isOpen: boolean;
  telecom: string;
  device: string;
  originalPrice: number;
  commonDiscount: number;
  option: {
    type: string;
    plan: string;
    price: number;
  } | null;
}

const editPriceModalAtom = atom<EditPriceModalState>({
  isOpen: false,
  telecom: "",
  device: "",
  originalPrice: 0,
  commonDiscount: 0,
  option: null,
});

const EditPriceModalOpenAtom = atom(
  (get) => get(editPriceModalAtom).isOpen,
  (_, set, payload: Omit<EditPriceModalState, "isOpen">) => {
    set(editPriceModalAtom, {
      isOpen: true,
      ...payload,
    });
  }
);

const EditPriceModalCloseAtom = atom(null, (_, set) => {
  set(editPriceModalAtom, {
    isOpen: false,
    telecom: "",
    device: "",
    originalPrice: 0,
    commonDiscount: 0,
    option: null,
  });
});

export { editPriceModalAtom, EditPriceModalOpenAtom, EditPriceModalCloseAtom };
