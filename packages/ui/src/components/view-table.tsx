import { flexRender, Table as RTable } from "@tanstack/react-table";
import { ComponentProps, ReactNode } from "react";

import { cn, getColumnPinningStyles } from "../lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export interface ViewTableProps<TData> extends ComponentProps<typeof Table> {
  table: RTable<TData>;
  empty?: ReactNode;
}

/**
 * a simple table for viewing data.
 */
export default function ViewTable<TData>({
  table,
  empty,
  className,
  ...props
}: ViewTableProps<TData>) {
  return (
    <Table className={className} {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="group">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn(
                  "relative z-0",
                  header.column.getIsPinned() &&
                    "sticky z-1 bg-background opacity-95 group-hover:bg-muted",
                )}
                style={getColumnPinningStyles(header.column)}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="group"
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    "relative z-0",
                    cell.column.getIsPinned() &&
                      "sticky z-1 bg-background opacity-95 group-hover:bg-muted",
                  )}
                  style={getColumnPinningStyles(cell.column)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          // if there is no items, render empty state
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className={cn("h-24 text-center", empty && "h-auto")}
            >
              {empty ?? "No results."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
