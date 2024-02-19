import { ReactNode } from "react";

export interface NavItem {
  children: ReactNode;
  href: string;
}

export const NAVLIST: NavItem[] = [
  {
    children: "맛집 목록",
    href: "/stores",
  },
  { children: "맛집 등록", href: "/stores/new" },
  { children: "맛집 가게", href: "/users/likes" },
  { children: "로그인", href: "/users/login" },
];

// Link href="/stores" className="navbar__list--item">
//             맛집 목록
//           </Link>
//           <Link href="/stores/new" className="navbar__list--item">
//             맛집 등록
//           </Link>
//           <Link href="/users/new" className="navbar__list--item">
//             맛집 가게
//           </Link>
//           <Link href="/users/login" className="navbar__list--item">
//             로그인
//           </Link>
