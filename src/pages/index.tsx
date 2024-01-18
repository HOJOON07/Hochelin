/*global kakoa*/

import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";

import * as storeData from "@/data/store_data.json";
import { useState } from "react";

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);

  const storeDatas = storeData["DATA"];
  return (
    <>
      <Map setMap={setMap} />
      <Markers
        storeDatas={storeDatas}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}
