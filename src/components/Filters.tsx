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
    k,
  }: {
    title: string;
    children: React.ReactNode;
    k: GroupKey;
  }) => (
    <div className="border-b border-light-300 py-4">
      <button
        className="flex w-full items-center justify-between text-body-medium text-dark-900"
        onClick={() => setExpanded((prev) => ({ ...prev, [k]: !prev[k] }))}
      >
        <span>{title}</span>
        <span className="text-caption text-dark-700">
          {expanded[k] ? "-" : "+"}
        </span>
      </button>

      <div
        id={`${k}-section`}
        className={`${expanded[k] ? "mt-3 block" : "hidden"}`}
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

      <aside className="sticky top-20 hidden h-fit min-w-60 rounded-lg border border-light-300 bg-light-100 p-4 md:block">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-body-medium text-dark-900">Filters</h3>
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
          k="gender"
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

                  <label
                    htmlFor={`gender-${gender}`}
                    className="text-body text-dark-900"
                  >
                    {gender[0].toUpperCase() + gender.slice(1)}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        <Group
          title={`Size ${activeCounts.size ? `(${activeCounts.size})` : ""}`}
          k="size"
        >
          <ul className="grid grid-cols-5 gap-2">
            {SIZES.map((size) => {
              const checked = getArrayParam(search, "size").includes(size);

              return (
                <li key={size}>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-dark-900"
                      checked={checked}
                      onChange={() => onToggle("size", size)}
                    />

                    <span className="text-body">{size}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        <Group
          title={`Color ${activeCounts.color ? `(${activeCounts.color})` : ""}`}
          k="color"
        >
          {COLORS.map((color) => {
            const checked = getArrayParam(search, "color").includes(color);

            return (
              <li key={color} className="flex items-center gap-2">
                <input
                  id={`color-${color}`}
                  type="checkbox"
                  className="h-4 w-4 accent-dark-900"
                  checked={checked}
                  onChange={() => onToggle("color", color)}
                />
                <label
                  htmlFor={`color-${color}`}
                  className="text-body capitalize"
                >
                  {color}
                </label>
              </li>
            );
          })}
        </Group>

        <Group
          title={`Price ${activeCounts.price ? `(${activeCounts.price})` : ""}`}
          k="price"
        >
          {PRICES.map((price) => {
            const checked = getArrayParam(search, "price").includes(price.id);

            return (
              <li key={price.id} className="flex items-center gap-2">
                <input
                  id={`price-${price.id}`}
                  type="checkbox"
                  className="h-4 w-4 accent-dark-900"
                  checked={checked}
                  onChange={() => onToggle("price", price.id)}
                />

                <label htmlFor={`price-${price.id}`} className="text-body">
                  {price.label}
                </label>
              </li>
            );
          })}
        </Group>
      </aside>
    </>
  );
}
