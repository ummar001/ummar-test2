import CheveronRight from "@/common/assets/chevron_right.svg";
import { IColumn } from "@/common/types";
import {
  Table as MUITable,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useCallback, useState } from "react";

export function Table<T>(props: {
  customHeaderBg?: string
  id: string
  data: T[]
  columns: IColumn<T>[]
  loading?: boolean
  skeletonLength?: number
  marginBottom?: number
  onMore?: (page: number) => void
  xs?: number
  md?: number
  lg?: number
  onClick?: (value: T) => void
  numberOfPage?: number
  currentPage?: number
}) {
  const {
    currentPage,
    numberOfPage,
    onMore,
    onClick,
    customHeaderBg,
    columns,
    data,
    loading,
  } = props;
  const [sortOrder, setSortOrder] = useState<IOrder>("desc");
  const [sortedColumn, setSortedColumn] = useState<IColumn<T> | null>(null);

  type IOrder = "asc" | "desc"

  const handleOnClick = useCallback(
    (item: T) => {
      if (!onClick) return;

      onClick(item);
    },
    [onClick]
  );

  const handleSort = (column: IColumn<T>) => {
    if (column === sortedColumn) {
      // Toggle the sort order if the same column is clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new sorted column and default to ascending order
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const sortableColumns = useCallback(() => {
    return data.sort((a, b) => {
      // Sort data based on the sorted column and order
      if (!sortedColumn) return 0;
      const aValue = sortedColumn.accessor && sortedColumn.accessor(a);
      const bValue = sortedColumn.accessor && sortedColumn.accessor(b);

      // Handle sorting for both strings and numbers
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        // Handle mixed types (string and number) as needed
        // You can customize the behavior here
        return 0;
      }
    });
  }, [data, sortOrder, sortedColumn]);

  const handlePageChange = (event: unknown, newPage: number) => {
    if (onMore) {
      onMore(newPage);
    }
  };

  return (
    <TableContainer sx={{ marginBottom: 5 }}>
      <MUITable
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0px 10px",
        }}
      >
        <TableHead
          sx={{
            backgroundColor: customHeaderBg ? customHeaderBg : "#555555",
            borderRadius: "10px",
          }}
        >
          <TableRow>
            {props.columns.map((col, i) => (
              <TableCell
                key={`${props.id}-header-${i}`}
                id={"test"}
                sx={{
                  borderBottom: "none",
                }}
                sortDirection={"asc"}
              >
                <TableSortLabel
                  onClick={() => handleSort(col)}
                  direction={sortedColumn === col ? sortOrder : "asc"}
                >
                  <Typography variant="body1" color="white">
                    {col.title}
                  </Typography>
                </TableSortLabel>
              </TableCell>
            ))}
            {onClick && (
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                <Typography variant="body1" color="white"></Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((col, j) => (
                  <TableCell key={j}>
                    <Skeleton />
                  </TableCell>
                ))}
                {onClick && (
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                )}
              </TableRow>
            ))
            : sortableColumns().map((item, i) => (
              <TableRow
                key={`${props.id}-row-${i}`}
                onClick={() => handleOnClick(item)}
                sx={{
                  cursor: onClick ? "pointer" : "default",
                  backgroundColor: "white",
                  borderRadius: 40,
                  height: 80,
                }}
              >
                {columns.map((col, j) => (
                  <TableCell
                    key={`${props.id}-row-${i}-col-${j}`}
                    sx={{
                      borderBottom: "none",
                    }}
                    id={"test"}
                  >
                    {col.render(item, i)}
                  </TableCell>
                ))}
                {onClick && (
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      textAlign: "end",
                      marginRight: "15px"
                    }}
                  >
                    <Image src={CheveronRight} alt="chevron_right" />
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </MUITable>
      {numberOfPage !== undefined && currentPage !== undefined && (
        <TablePagination
          component="div"
          count={numberOfPage}
          rowsPerPage={1}
          rowsPerPageOptions={[]}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </TableContainer>
  );
}

export default Table;
