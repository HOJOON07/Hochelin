"use client";

import { mapState } from "@/atom";
import React, { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import FullPageLoader from "./FullPageLoader";

export default function CurrentLocationButton() {
  const map = useRecoilValue(mapState);
  const [loading, setLoading] = useState<boolean>(false);
  const handleCurrentPosition = () => {
    setLoading(true);

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        //성공
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          // console.log(currentPosition);
          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success("현재 위치로 이동되었습니다.");
          }
          return currentPosition;
        },
        //실패

        () => {
          setLoading(false);
          toast.error("현재 위치를 가져올 수 없습니다.");
        },
        options
      );
    }
  };
  return (
    <React.Fragment>
      {loading && <FullPageLoader />}
      <button
        type="button"
        className="fixed z-10 p-2 shadow right-5 bottom-20 bg-blue-100 rounded-md hover:shadow-lg focus:shadow-lg hover:bg-gray-100"
        onClick={() => handleCurrentPosition()}
      >
        <MdOutlineMyLocation className="w-5 h-5" />
      </button>
    </React.Fragment>
  );
}
