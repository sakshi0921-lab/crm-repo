import { useState } from "react";
import { z } from "zod";
import { Plus, Loader2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addLead, LEAD_SOURCES, type LeadSource } from "@/lib/leads";
import { useTheme } from "@/hooks/use-theme";

// ✅ Validation Schema
const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone must be at least 7 digits")
    .regex(/^[+\d\s-()]+$/, "Invalid phone format"),
  source: z.enum(["Call", "WhatsApp", "Field"]),
  notes: z.string().optional(),
});

interface Props {
  onAdded: () => void;
}

export function AddLeadForm({ onAdded }: Props) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState<LeadSource | "">("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = schema.safeParse({
      name,
      phone,
      source,
      notes: notes || undefined,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
await addLead({
  name: parsed.data.name,
  phone: parsed.data.phone,
  source: parsed.data.source,
  notes: parsed.data.notes,
});
      toast.success("Lead added successfully 🚀");

      // Reset form
      setName("");
      setPhone("");
      setSource("");
      setNotes("");

      onAdded();
    } catch (err) {
      toast.error("Failed to add lead");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)",
          backdropFilter: "blur(20px)",
        }}
      />

      {/* Header */}
      <div className="mb-8 relative z-10 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 transition-all duration-300">
            Add New Lead
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Capture and manage your leads efficiently
          </p>
        </div>
        {mounted && (
          <Button
            onClick={toggleTheme}
            size="icon"
            className="rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/15 transition-all duration-300"
            variant="ghost"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </Button>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid gap-5 md:grid-cols-2 relative z-10">
        
        {/* Name */}
        <div className="space-y-2.5">
          <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 focus:border-indigo-500/50 focus:bg-white/70 dark:focus:bg-white/20 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          {errors.name && (
            <p className="text-xs text-red-500 font-medium animate-pulse">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2.5">
          <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Phone</Label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 9876543210"
            className="rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 focus:border-indigo-500/50 focus:bg-white/70 dark:focus:bg-white/20 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 font-medium animate-pulse">{errors.phone}</p>
          )}
        </div>

        {/* Source */}
        <div className="space-y-2.5">
          <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Source</Label>
          <Select
            value={source}
            onValueChange={(v) => setSource(v as LeadSource)}
          >
            <SelectTrigger className="rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 focus:border-indigo-500/50 transition-all duration-300 text-gray-900 dark:text-white">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-white/20 dark:border-white/10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
              {LEAD_SOURCES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.source && (
            <p className="text-xs text-red-500 font-medium animate-pulse">{errors.source}</p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2.5 md:col-span-2">
          <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Notes</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add extra details..."
            rows={3}
            className="rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 focus:border-indigo-500/50 focus:bg-white/70 dark:focus:bg-white/20 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end relative z-10">
        <Button
          type="submit"
          disabled={submitting}
          className="relative group/btn px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          <span className="relative">Add Lead</span>
        </Button>
      </div>
    </form>
  );
}
