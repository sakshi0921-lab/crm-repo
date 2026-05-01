import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddLeadForm } from "@/components/AddLeadForm";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { getLeads, LEAD_SOURCES, LEAD_STATUSES, type Lead } from "@/lib/leads";
import { toast } from "sonner";

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  async function load() {
    try {
      setLeads(await getLeads());
    } catch (err) {
      toast.error("Could not load leads", { description: err instanceof Error ? err.message : "" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return l.name.toLowerCase().includes(q) || l.phone.toLowerCase().includes(q) || (l.notes ?? "").toLowerCase().includes(q);
    });
  }, [leads, search, sourceFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/60 backdrop-blur">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: "var(--gradient-brand)" }}>
              <Sparkles className="h-5 w-5 text-brand-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">LeadDesk</h1>
              <p className="text-xs text-muted-foreground">Mini CRM for fast lead capture</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <StatsCards leads={leads} />

        <AddLeadForm onAdded={load} />

        <section className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Pipeline</h2>
              <p className="text-sm text-muted-foreground">{filtered.length} of {leads.length} leads</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, phone, notes…"
                  className="pl-9 sm:w-64"
                />
              </div>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="sm:w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sources</SelectItem>
                  {LEAD_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {LEAD_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="rounded-xl border bg-card p-12 text-center text-sm text-muted-foreground">Loading…</div>
          ) : (
            <LeadsTable leads={filtered} onChange={load} />
          )}
        </section>

        
      </main>
    </div>
  );
};

export default Index;
