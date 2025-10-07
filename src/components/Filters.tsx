"use client";

import {
  getArrayParam,
  removeParams,
  toggleArrayParam,
} from "@/lib/utils/query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const GENDERS = ["men", "women", "unisex"] as const;
const SIZES = ["XS", "S", "M", "L", "XL"] as const;
const COLORS = ["black", "white", "red", "green", "blue", "grey"] as const;
const PRICES = [
  { id: "0-50", label: "$0 - $50" },
  { id: "50-100", label: "$50 - $100" },
  { id: "100-150", label: "$100 - $150" },
  { id: "150-", label: "Over $150" },
] as const;

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

  const Group = ({
    title,
    children,
    key,
  }: {
    title: string;
    children: React.ReactNode;
    key: GroupKey;
  }) => (
    <div className="border-b border-light-300 py-4">
      <button
        className="flex w-full items-center justify-between text-body-medium text-dark-900"
        onClick={() => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))}
      >
        <span>{title}</span>
        <span className="text-caption text-dark-700">
          {expanded[key] ? "-" : "+"}
        </span>
      </button>

      <div
        id={`${key}-section`}
        className={`${expanded[key] ? "mt-3 block" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );

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

      <Group
        title={`Gender ${
          activeCounts.gender ? `(${activeCounts.gender})` : ""
        }`}
        key="gender"
      >
        <ul className="space-y-2">
          {GENDERS.map((gender) => {
            const checked = getArrayParam(search, "gender").includes(gender);

            return (
              <li key={gender} className="flex items-center gap-2">
                <input
                  id={`gender-${gender}`}
                  type="checkbox"
                  className="h-4 w-4 accent-dark-900"
                  checked={checked}
                  onChange={() => onToggle("gender" as GroupKey, gender)}
                />
              </li>
            );
          })}
        </ul>
      </Group>
    </>
  );
}
