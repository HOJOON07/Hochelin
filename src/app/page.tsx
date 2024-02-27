/*global kakao*/

import CurrentLocationButton from "@/components/CurrentLocationButton";
import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";

export default async function Home() {
  const stores: StoreType[] = await getData();
  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to data fetch");

  return res.json();
}
