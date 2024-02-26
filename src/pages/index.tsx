/*global kakoa*/

import CurrentLocationButton from "@/components/CurrentLocationButton";
import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import axios from "axios";

// import * as storeData from "@/data/store_data.json";
import { useState } from "react";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [currentStore, setCurrentStore] = useState(null);
  // console.log(stores);
  // const storeDatas = storeData["DATA"];
  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
}

export async function getServerSideProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  return {
    props: { stores: stores.data },
  };
}
