import { useState, useMemo } from "react";
import { Phone, Trash2, MessageCircle, MapPin, PhoneCall, Search } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  deleteLead,
  updateLeadStatus,
  LEAD_STATUSES,
  LEAD_SOURCES,
  type Lead,
  type LeadStatus,
  type LeadSource,
} from "@/lib/leads";

interface Props {
  leads: Lead[];
  onChange: () => void;
}

const sourceMeta: Record<string, { icon: typeof Phone; className: string }> = {
  Call: { icon: PhoneCall, className: "bg-blue-100 text-blue-600" },
  WhatsApp: { icon: MessageCircle, className: "bg-green-100 text-green-600" },
  Field: { icon: MapPin, className: "bg-yellow-100 text-yellow-600" },
};

export function LeadsTable({ leads, onChange }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "All">("All");

  async function handleStatus(id: number, status: LeadStatus) {
    await updateLeadStatus(id, status);
    toast.success("Updated");
    onChange();
  }

  async function handleDelete(id: number, name: string) {
    await deleteLead(id);
    toast.success(`Deleted ${name}`);
    onChange();
  }

  // 🔥 FILTER LOGIC
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);

      const matchStatus =
        statusFilter === "All" || lead.status === statusFilter;

      const matchSource =
        sourceFilter === "All" || lead.source === sourceFilter;

      return matchSearch && matchStatus && matchSource;
    });
  }, [leads, search, statusFilter, sourceFilter]);

  return (
    <div className="rounded-3xl overflow-hidden transition-all duration-500 mx-6 mb-12" style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      backdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.2)",
    }}>

      {/* 🔥 TOP BAR */}
      <div className="p-6 border-b border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between bg-gradient-to-r from-white/5 to-transparent dark:from-white/5 dark:to-transparent">
        
        {/* Search */}
        <div className="flex items-center gap-3 w-full md:w-1/3 rounded-xl px-4 py-2.5 transition-all duration-300 bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/15 focus-within:bg-white/60 dark:focus-within:bg-white/20">
          <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search name or phone..."
            className="border-0 focus-visible:ring-0 bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger className="w-[140px] rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/15 transition-all duration-300 text-gray-900 dark:text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-white/20 dark:border-white/10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
              <SelectItem value="All">All Status</SelectItem>
              {LEAD_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Source Filter */}
          <Select value={sourceFilter} onValueChange={(v) => setSourceFilter(v as any)}>
            <SelectTrigger className="w-[140px] rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/15 transition-all duration-300 text-gray-900 dark:text-white">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-white/20 dark:border-white/10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
              <SelectItem value="All">All Source</SelectItem>
              {LEAD_SOURCES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-white/10 to-transparent dark:from-white/5 dark:to-transparent text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left">Lead</th>
              <th className="px-6 py-4 text-left">Source</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Added</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {filteredLeads.map((lead) => {
              const SrcIcon = sourceMeta[lead.source]?.icon ?? Phone;

              return (
                <tr key={lead.id} className="hover:bg-white/10 dark:hover:bg-white/5 transition-colors duration-200">

                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white">{lead.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3" />
                      {lead.phone}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <Badge className={`${sourceMeta[lead.source]?.className} rounded-full font-medium`}>
                      <SrcIcon className="h-3 w-3 mr-1" />
                      {lead.source}
                    </Badge>
                  </td>

                  <td className="px-6 py-4">
                    <Select
                      value={lead.status}
                      onValueChange={(v) => handleStatus(lead.id, v as LeadStatus)}
                    >
                      <SelectTrigger className="h-8 w-[140px] rounded-lg bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/15 transition-all duration-300 text-gray-900 dark:text-white text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-white/20 dark:border-white/10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
                        {LEAD_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" className="hover:bg-red-500/10 transition-colors duration-300 rounded-lg">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="rounded-2xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border border-white/20 dark:border-white/10">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-gray-900 dark:text-white">Delete lead?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                            This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(lead.id, lead.name)}
                            className="bg-red-600 hover:bg-red-700 rounded-lg"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
