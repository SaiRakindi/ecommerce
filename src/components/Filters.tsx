"use client";

import {
  getArrayParam,
  removeParams,
  toggleArrayParam,
} from "@/lib/utils/query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type GroupKey = "gender" | "size" | "color" | "price";

export default function Filters() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = new URLSearchParams();
  const search = useMemo(() => `?${searchParams.toString()}`, [searchParams]);

  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = useState<Record<GroupKey, boolean>>({
    gender: true,
    size: true,
    color: true,
    price: true,
  });

  const activeCounts = {
    gender: getArrayParam(search, "gender").length,
    size: getArrayParam(search, "size").length,
    color: getArrayParam(search, "color").length,
    price: getArrayParam(search, "price").length,
  };

  useEffect(() => {
    setOpen(false);
  }, [search]);

  const onToggle = (key: GroupKey, value: string) => {
    const url = toggleArrayParam(pathname, search, key, value);
    router.push(url, { scroll: false });
  };

  const clearAll = () => {
    const url = removeParams(pathname, search, [
      "gender",
      "size",
      "color",
      "price",
      "page",
    ]);
    router.push(url, { scroll: false });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          className="rounded-md border border-light-300 px-3 py-2 text-body-medium"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          Filters
        </button>

        <button
          className="text-caption text-dark-700 underline"
          onClick={clearAll}
        >
          Clear All
        </button>
      </div>
    </>
  );
}
