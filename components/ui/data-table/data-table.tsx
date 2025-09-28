"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./pagination"
import { useState } from "react"
import { Input } from "@/components/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { Spinner } from "../shadcn-io/spinner"
import { Skeleton } from "../skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility
    }

  });

  return (
      <div className="space-y-2">
          <div className="flex items-center py-4">
              <Input
                  placeholder="Search..."
                  value={table.getState().globalFilter}
                  onChange={(event) =>
                      table.setGlobalFilter(event.target.value)
                  }
                  className="max-w-sm"
                  disabled={isLoading}
              />

              <DataTableViewOptions table={table} />
          </div>
          <div className="overflow-hidden rounded-md border">
              <Table>
                  <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                  return (
                                      <TableHead key={header.id}>
                                          {header.isPlaceholder
                                              ? null
                                              : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                      </TableHead>
                                  );
                              })}
                          </TableRow>
                      ))}
                  </TableHeader>
                  <TableBody>
                      {isLoading ? [0,1,2].map((item) => (
                          <TableRow key={item}>
                              {table.getVisibleLeafColumns().map((col) => (
                                <TableCell key={col.id} className="h-[3rem]">
                                    <Skeleton className="h-[1.5rem] w-1/2"/>
                                </TableCell>
                              ))}
                          </TableRow>
                      )) : table.getRowModel().rows?.length === 0 ? (
                          <TableRow>
                              <TableCell
                                  colSpan={table.getVisibleLeafColumns().length}
                                  className="h-24 text-center"
                              >
                                  No results.
                              </TableCell>
                          </TableRow>
                      ) : (
                          table.getRowModel().rows.map((row) => (
                              <TableRow
                                  key={row.id}
                                  data-state={row.getIsSelected() && "selected"}
                              >
                                  {row.getVisibleCells().map((cell) => (
                                      <TableCell key={cell.id}>
                                          {flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext()
                                          )}
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))
                      )}
                  </TableBody>
              </Table>
          </div>
          <DataTablePagination table={table} />
      </div>
  );
}