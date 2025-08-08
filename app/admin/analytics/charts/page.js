"use client";

import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// Only load charts client-side
// const Chart = dynamic(() => import("./ChartComponent"), {
//   ssr: false,
//   loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded"></div>,
// });

export default function ChartsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Analytics Charts</h1>
      {/* <Chart /> */}
    </div>
  );
}