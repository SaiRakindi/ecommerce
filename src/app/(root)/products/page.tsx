import Filters from "@/components/Filters";
import React from "react";

export default function ProductsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
      <Filters />
    </section>
  );
}
