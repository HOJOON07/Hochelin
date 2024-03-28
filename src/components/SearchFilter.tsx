import { searchState } from "@/atom";
import { DISTRICT_ARR } from "@/data/store";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";

export default function SearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);

  const [debouncedSearch, setDebouncedSearch] = useDebounceValue(
    search?.q,
    2000
  ); // 사용자 입력을 디바운싱

  // 사용자 입력 처리
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearch(e.target.value);
  };

  // 디바운싱된 검색어를 Recoil 상태에 반영
  useEffect(() => {
    setSearch((prev) => ({ ...prev, q: debouncedSearch }));
  }, [debouncedSearch, setSearch]);

  return (
    <div className="flex flex-col md:flex-row gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2">
        <AiOutlineSearch className="w-6 h-6" />
        <input
          // onChange={(e) => setSearch({ ...search, q: e.target.value })}
          onChange={handleInputChange}
          type="search"
          placeholder="음식점 검색"
          className="block w-full p-3 text-sm text-gray-800 border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500 focus:border-2"
        />
      </div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-blue-500 block w-full p-3"
        onChange={(e) => setSearch({ ...search, district: e.target.value })}
        // onChange={handleDistrictChange}
      >
        <option value="">지역 선택</option>
        {DISTRICT_ARR.map((data) => {
          return (
            <option value={data} key={data}>
              {data}
            </option>
          );
        })}
      </select>
    </div>
  );
}
