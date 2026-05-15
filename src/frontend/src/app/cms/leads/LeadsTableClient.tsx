"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

interface Lead {
  id: string;
  segment: "driver" | "partner";
  fullName: string;
  phone: string;
  email: string | null;
  province: string | null;
  companyName: string | null;
  licensePlate: string | null;
  source: string | null;
  createdAt: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function LeadsTableClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, limit: 20, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Filter state
  const [segment, setSegment] = useState<string>(searchParams.get("segment") ?? "all");
  const [province, setProvince] = useState(searchParams.get("province") ?? "");
  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") ?? "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? "1"));

  const buildQuery = useCallback(
    (overrides?: Partial<{ segment: string; province: string; dateFrom: string; dateTo: string; page: number }>) => {
      const s = overrides?.segment ?? segment;
      const p = overrides?.province ?? province;
      const df = overrides?.dateFrom ?? dateFrom;
      const dt = overrides?.dateTo ?? dateTo;
      const pg = overrides?.page ?? page;

      const params = new URLSearchParams();
      if (s && s !== "all") params.set("segment", s);
      if (p) params.set("province", p);
      if (df) params.set("dateFrom", df);
      if (dt) params.set("dateTo", dt);
      params.set("page", String(pg));
      params.set("limit", "20");
      return params.toString();
    },
    [segment, province, dateFrom, dateTo, page],
  );

  const fetchLeads = useCallback(
    async (query: string) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/leads?${query}`);
        if (!res.ok) throw new Error();
        const { data } = await res.json();
        setLeads(data.items ?? []);
        setMeta(data.meta);
      } catch {
        toast.error("Không thể tải danh sách leads");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchLeads(buildQuery());
  }, [fetchLeads, buildQuery]);

  const handleFilter = () => {
    setPage(1);
    const q = buildQuery({ page: 1 });
    router.push(`/cms/leads?${q}`, { scroll: false });
    fetchLeads(q);
  };

  const handleReset = () => {
    setSegment("all");
    setProvince("");
    setDateFrom("");
    setDateTo("");
    setPage(1);
    router.push("/cms/leads", { scroll: false });
    fetchLeads("page=1&limit=20");
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const q = buildQuery({ page: newPage });
    router.push(`/cms/leads?${q}`, { scroll: false });
    fetchLeads(q);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const s = segment !== "all" ? segment : "";
      const params = new URLSearchParams();
      if (s) params.set("segment", s);
      if (province) params.set("province", province);
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);

      const res = await fetch(`/api/leads/export?${params.toString()}`);
      if (!res.ok) throw new Error("Export thất bại");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Đã tải xuống file CSV");
    } catch {
      toast.error("Không thể export CSV, vui lòng thử lại");
    } finally {
      setExporting(false);
    }
  };

  const hasFilter = (segment && segment !== "all") || province || dateFrom || dateTo;

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-end gap-3 p-4 rounded-lg border bg-card">
        <div className="flex flex-col gap-1.5 min-w-[140px]">
          <label className="text-xs font-medium text-muted-foreground">Phân khúc</label>
          <Select value={segment} onValueChange={(v) => setSegment(v ?? "all")}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="driver">Tài xế</SelectItem>
              <SelectItem value="partner">Đối tác</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-muted-foreground">Tỉnh / Khu vực</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              className="h-9 pl-8"
              placeholder="Hồ Chí Minh..."
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Từ ngày</label>
          <Input
            type="date"
            className="h-9 w-36"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Đến ngày</label>
          <Input
            type="date"
            className="h-9 w-36"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={handleFilter} className="h-9">
            Lọc
          </Button>
          {hasFilter && (
            <Button size="sm" variant="outline" onClick={handleReset} className="h-9">
              <X className="h-3.5 w-3.5 mr-1" />
              Xóa lọc
            </Button>
          )}
        </div>

        <div className="ml-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            disabled={exporting}
            className="h-9 gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            {exporting ? "Đang xuất..." : "Export CSV"}
          </Button>
        </div>
      </div>

      {/* Summary */}
      {!loading && (
        <p className="text-sm text-muted-foreground">
          {hasFilter ? `Kết quả lọc: ` : "Tổng: "}
          <span className="font-semibold text-foreground">{meta.total}</span> leads
        </p>
      )}

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[180px]">Họ tên</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Phân khúc</TableHead>
              <TableHead>Tỉnh/Khu vực</TableHead>
              <TableHead>Thông tin thêm</TableHead>
              <TableHead>Nguồn</TableHead>
              <TableHead className="text-right">Ngày đăng ký</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  {hasFilter ? "Không có lead phù hợp với bộ lọc." : "Chưa có lead nào."}
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{lead.fullName}</TableCell>
                  <TableCell className="font-mono text-sm">{lead.phone}</TableCell>
                  <TableCell>
                    <Badge variant={lead.segment === "driver" ? "default" : "secondary"}>
                      {lead.segment === "driver" ? "Tài xế" : "Đối tác"}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.province ?? <span className="text-muted-foreground">—</span>}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lead.segment === "driver" && lead.licensePlate
                      ? `BSX: ${lead.licensePlate}`
                      : lead.segment === "partner" && lead.companyName
                      ? lead.companyName
                      : <span>—</span>}
                  </TableCell>
                  <TableCell>
                    {lead.source ? (
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                        {lead.source}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Trang {meta.page} / {meta.totalPages}
          </p>
          <div className="flex gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= meta.totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
