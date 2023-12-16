import { IColumn } from "@/common/types";
import { useMemo, useState } from "react";
import { UseInfiniteQueryResult } from "react-query";
import Table from "./table";

export function TableInfiniteQuery<T, R>(props: {
  id: string
  query: UseInfiniteQueryResult<R>
  field: keyof R
  xs?: number
  md?: number
  lg?: number
  columns: IColumn<T>[]
  onClick?: (value: T) => void
  numberOfPage: number | undefined
  customHeaderBg?: string
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { numberOfPage, id, query, field, customHeaderBg } = props;
  const loading = useMemo(
    () => query.isLoading || query.isFetching || query.isIdle,
    [query]
  );

  const handleMore = (page: number) => {
    if (query.hasNextPage && page > currentPage) {
      query.fetchNextPage({ pageParam: page });
    } else if (query.hasPreviousPage) {
      if (page > 0) {
        query.fetchPreviousPage({ pageParam: page });
      }
    }
    setCurrentPage(page);
  };

  return (
    <Table
      id={`${id}`}
      columns={props.columns}
      loading={loading}
      data={
        query.data?.pages[currentPage]
          ? (query.data?.pages[currentPage][field] as T[])
          : []
      }
      numberOfPage={numberOfPage}
      currentPage={currentPage}
      onMore={handleMore}
      onClick={props.onClick}
      xs={props.xs}
      md={props.md}
      lg={props.lg}
      customHeaderBg={customHeaderBg}
    />
  );
}

export default TableInfiniteQuery;
