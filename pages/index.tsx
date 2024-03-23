/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Car from "@/types/Car";
import fs from "fs";
import path from "path";
import AntdTable from "../components/Table";
import Search from "antd/lib/input/Search";
import ClearOutlined from "@ant-design/icons/ClearOutlined";
import { vehicleColumn } from "../utils/vehicle-column";

type Props = {
  items: Car[];
};

function index({ items }: Props) {
  const [searchString, setSearchString] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Car[]>(items);

  const onSearch = (search: String) => {
    const filteredItems = items.filter((car) => {
      const values = Object.values(car);
      return values.some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredData(filteredItems);
  };

  const clearSearch = () => {
    setSearchString("");
    setFilteredData(items);
  };

  return (
    <div className="h-full flex flex-col p-5 md:p-10">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-5 md:mb-10">
        <h1 className="font-semibold text-3xl mb-4 sm:mb-0">Vehicle</h1>
        <div className="flex flex-row items-center">
          {searchString.length > 0 && (
            <ClearOutlined onClick={clearSearch} title="Clear search" />
          )}
          <Search
            placeholder="Search vehicle..."
            onSearch={onSearch}
            enterButton
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="ml-2 w-full md:max-w-[300px]"
          />
        </div>
      </div>
      <div>
        <AntdTable data={filteredData} columns={vehicleColumn} />
      </div>
    </div>
  );
}

export async function getServerSideProps({}) {
  const filePath = path.join(process.cwd(), "data", "vehicle_data.json");
  try {
    const jsonFile = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonFile);
    return { props: { items: data } };
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return { props: { items: [] } };
  }
}

export default index;
