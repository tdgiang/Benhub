"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  pageSize?: number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading = false,
  searchable = true,
  searchKeys = [],
  pageSize = 10,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = searchable && search
    ? data.filter((row) =>
        searchKeys.some((key) =>
          String(row[key]).toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const hasActions = !!onEdit || !!onDelete;

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="datatable-search"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
      )}

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((col) => (
                <TableHead key={String(col.key)} className="font-semibold">
                  {col.label}
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className="text-right font-semibold">Thao tác</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell>
                      <Skeleton className="h-5 w-20 ml-auto" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : paged.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="text-center py-12 text-muted-foreground"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            id={`edit-${row.id}`}
                            onClick={() => onEdit(row)}
                          >
                            Sửa
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            id={`delete-${row.id}`}
                            onClick={() => onDelete(row)}
                            className="text-destructive hover:text-destructive"
                          >
                            Xóa
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Hiển thị {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, filtered.length)} / {filtered.length} kết quả
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              id="datatable-prev"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-3 py-1.5 rounded-md bg-muted font-medium text-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              id="datatable-next"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
