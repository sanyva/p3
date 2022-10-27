import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default function usePaging() {
  const route = useRoute();
  const router = useRouter();

  const data = {
    currentPage: computed({
      get() {
        return route.query.page ? Number(route.query.page) : 1;
      },
      set(newValue: number) {
        router.replace({
          query: {
            ...route.query,
            page: newValue,
          },
        });
      },
    }),
    totalPages: null,
    elementsTotal: null,
  };

  const onChangeCurrentPage = (newPage: number) => {
    data.currentPage.value = newPage;
  };

  return { data, onChangeCurrentPage };
}
