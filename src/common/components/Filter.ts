import { computed } from "vue";
import FilterList from "@/core/types/FilterList";
import { useRoute, useRouter } from "vue-router";
import * as _ from "lodash";

interface FilterModel {
  [key: string]: string | object | null;
}

export default function useFilter(filterParams: FilterList[]) {
  const route = useRoute();
  const router = useRouter();
  const filterNames = filterParams.map((i) => i.param);

  const data = computed({
    get() {
      const filter: FilterModel = {};
      filterNames.forEach((i) => {
        const paramsFilter = filterParams.find((y) => y.param === i);
        if (
          paramsFilter?.options?.props &&
          route.params[paramsFilter?.options?.props]
        ) {
          filter[i] =
            route.params[paramsFilter?.options?.props] ||
            paramsFilter?.default ||
            null;
        } else {
          filter[i] = route.query[i] || paramsFilter?.default || null;
        }
      });
      return filter;
    },
    set(newFilter: object) {
      const existFilter = _.reduce(
        newFilter,
        function (result, value, key: string) {
          const paramsFilter = filterParams.find((y) => y.param === key);
          if (
            paramsFilter?.options?.props &&
            route.params[paramsFilter?.options?.props]
          ) {
            return result;
          }

          return value
            ? { ...result, [key]: value }
            : { ...result, [key]: undefined };
        },
        {}
      );
      router.replace({
        query: {
          ...route.query,
          ...existFilter,
        },
      });
    },
  });

  const model = filterParams.map((i) => {
    return {
      ...i,
      disable: !!(i?.options?.props && route.params[i?.options?.props]),
    };
  });

  return { data, model };
}
