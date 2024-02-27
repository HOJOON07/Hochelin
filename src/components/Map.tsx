/*global kakao*/
"use client";

import { locationState, mapState } from "@/atom";
import Script from "next/script";
import { Dispatch, SetStateAction } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);
  const loadKakaoMap = () => {
    //kakao map load func
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng
        ),
        // 줌 단계
        level: zoom ?? location.zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        onReady={loadKakaoMap}
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
      ></Script>
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
