import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMap } from "react-icons/hi";
import { StoreType } from "@/interface";
interface StoreBoxProps {
  store: StoreType | null;
  setStore: Dispatch<SetStateAction<any>>;
}
export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm mad:max-w-sl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  alt="마커 이미지"
                  width={100}
                  height={100}
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : "/images/markers/default.png"
                  }
                ></Image>
                <div>
                  <div className="font-semibold">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStore(null);
                }}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <HiOutlineMap />
              {store?.address}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store?.foodCertifyName}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineCheck />
              {store?.category}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              window.alert("상세보기 작업중");
            }}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
