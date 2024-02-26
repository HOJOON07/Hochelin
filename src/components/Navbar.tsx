import Link from "next/link";
import { useState } from "react";

import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { NAVLIST } from "@/constants/NavbarMenuList";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, status } = useSession();

  console.log(data, status);
  return (
    <>
      <div className="navbar">
        <Link href="/">
          <div className="navbar__logo">Hochelin</div>
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜한 가게
          </Link>
          <Link href="/users/mypage" className="navbar__list--item">
            마이페이지
          </Link>
          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          )}
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
          <div className="navbar__list--mobile">
            <Link
              href="/stores"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              맛집 목록
            </Link>
            <Link
              href="/stores/new"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              맛집 등록
            </Link>
            <Link
              href="/users/likes"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              찜한 가게
            </Link>
            <Link
              href="/users/mypage"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              마이페이지
            </Link>
            {status === "authenticated" ? (
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
              >
                로그아웃
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className="navbar__list--item--mobile"
                onClick={() => setIsOpen(false)}
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
