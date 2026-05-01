import { Users, TrendingUp, Sparkles, XCircle } from "lucide-react";
import type { Lead } from "@/lib/leads";

interface Props { leads: Lead[]; }

export function StatsCards({ leads }: Props) {
  const total = leads.length;
  const interested = leads.filter((l) => l.status === "Interested").length;
  const converted = leads.filter((l) => l.status === "Converted").length;
  const notInterested = leads.filter((l) => l.status === "Not Interested").length;
  const conversionRate = total ? Math.round((converted / total) * 100) : 0;

  const stats = [
    { label: "Total Leads", value: total, icon: Users, tone: "text-foreground", bg: "bg-secondary" },
    { label: "Interested", value: interested, icon: Sparkles, tone: "text-info", bg: "bg-info/10" },
    { label: "Converted", value: converted, icon: TrendingUp, tone: "text-success", bg: "bg-success/10", sub: `${conversionRate}% rate` },
    { label: "Not Interested", value: notInterested, icon: XCircle, tone: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border bg-card p-5 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{s.value}</p>
              {s.sub && <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>}
            </div>
            <div className={`rounded-lg p-2 ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.tone}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
