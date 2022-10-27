import FilterParam from "@/core/types/FilterParam";

type ModelStore = {
  dataList: object | null;
  paging: any;
  filter: FilterParam[];
};

export default ModelStore;
