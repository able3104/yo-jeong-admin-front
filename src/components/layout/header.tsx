import { Menu } from "lucide-react";
import { modalLogo } from "../../assets";
import { useState } from "react";
import NavBar from "./navBar";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <>
      <header className="sticky top-0 grid grid-cols-[40px_1fr_40px] w-full h-20 p-5 bg-white shadow-sm z-100">
        <button className="p-2 text-blue-primary" onClick={toggleMenu}>
          <Menu size={24} strokeWidth={3} />
        </button>
        <div className="flex justify-center w-full">
          <img src={modalLogo} width={80} height={40} alt="Logo" />
        </div>
      </header>
      <NavBar isOpen={isOpenMenu} close={() => setIsOpenMenu(false)} />
    </>
  );
};

export default Header;
