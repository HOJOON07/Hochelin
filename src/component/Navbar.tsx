import Link from "next/link";
import { useState } from "react";

import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { NAVLIST } from "@/constants/NavbarMenuList";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">nextmap</div>
        <div className="navbar__list">
          {NAVLIST.map((item, idx) => {
            return (
              <Link href={item.href} key={idx} className="navbar__list--item">
                {item.children}
              </Link>
            );
          })}
        </div>
        {/* 모바일에서만 보이는 버튼 */}
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => {
            setIsOpen((val) => !val);
          }}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {isOpen && (
        <div className="navbar--mobile">
          {NAVLIST.map((item, idx) => {
            return (
              <Link href={item.href} key={idx} className="navbar__list--item">
                {item.children}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
