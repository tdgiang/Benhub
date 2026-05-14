"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function CmsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CMS Error]", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-destructive/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <CardTitle className="text-destructive">Đã xảy ra lỗi</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {error.message || "Không thể tải trang này. Vui lòng thử lại."}
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono">
              Mã lỗi: {error.digest}
            </p>
          )}
          <Button onClick={reset} variant="outline" className="w-full">
            Thử lại
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
