import {
  ColumnDef,
  ColumnPinningState,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

export function useTable<TData>(
  columns: ColumnDef<TData, any>[],
  data: TData[],
) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: [],
    right: [],
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    state: {
      columnPinning,
      sorting,
    },
  });

  return { table };
}
