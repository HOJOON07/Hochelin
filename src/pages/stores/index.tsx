import Loading from "@/components/Loading";
import { StoreApiResonpse } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function StoreListPage() {
  const router = useRouter();
  const { page = "1" }: any = router.query;

  console.log(page);
  const {
    data: stores,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [`stores-${page}`],
    queryFn: async () => {
      const { data } = await axios(`api/stores?page=${page}`);
      return data as StoreApiResonpse;
    },
  });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.data.map((store, index) => (
            <li className="flex justify-between gap-x-6 py-5" key={index}>
              <div className="flex gap-x-4">
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : "/images/markers/default.png"
                  }
                  alt="마커 이미지"
                  width={48}
                  height={48}
                ></Image>
                <div>
                  <div className="text-sm font-semibold leading-9 text-gray-900">
                    {store?.name}
                  </div>
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {store?.storeType}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  {store.address}
                </div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {store?.phone || "번호없음"} | {store?.foodCertifyName}
                  {store?.category}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {stores?.totalPage && (
        <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap text-black">
          {stores?.totalPage > 10 ? (
            [...Array(stores?.totalPage)].map((x, i) => {
              return (
                <Link
                  href={{
                    pathname: `/stores`,
                    query: { page: i + 1 },
                  }}
                  key={i}
                >
                  <span
                    className={`px-3 rounded border shadow-sm bg-white ${
                      i + 1 === parseInt(page, 10)
                        ? "text-blue-600 font-bold"
                        : "text-gray-300"
                    }`}
                  >
                    {i + 1}
                  </span>
                </Link>
              );
            })
          ) : (
            <>
              {parseInt(page) > 1 && (
                <Link
                  href={{
                    pathname: `/stores`,
                    query: { page: parseInt(page) - 1 },
                  }}
                >
                  <span className={`px-3 rounded border shadow-sm bg-white`}>
                    이전
                  </span>
                </Link>
              )}
              <Link
                href={{
                  pathname: `/stores`,
                  query: { page: parseInt(page) },
                }}
              >
                <span
                  className={`px-3 rounded border shadow-sm bg-white text-blue-600`}
                >
                  {page}
                </span>
              </Link>
              {stores?.totalPage > parseInt(page) && (
                <Link
                  href={{
                    pathname: `/stores`,
                    query: { page: parseInt(page) + 1 },
                  }}
                >
                  <span className={`px-3 rounded border shadow-sm bg-white`}>
                    다음
                  </span>
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
