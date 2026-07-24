"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { stats } from "@/data/stats";

export default function Stats() {
  return (
    <section className="py-28 px-6 bg-deep relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(160,73,164,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          title="Em Números"
          subtitle="Métricas que refletem dedicação, prática e evolução contínua."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
