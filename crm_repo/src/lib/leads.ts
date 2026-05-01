const API = "http://localhost:5000/leads";

export type LeadSource = "Call" | "WhatsApp" | "Field";
export type LeadStatus = "New" | "Interested" | "Not Interested" | "Converted";

export interface Lead {
  id: number; // ✅ IMPORTANT (number, not string)
  name: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  created_at: string;
}

export const LEAD_SOURCES: LeadSource[] = ["Call", "WhatsApp", "Field"];
export const LEAD_STATUSES: LeadStatus[] = [
  "New",
  "Interested",
  "Not Interested",
  "Converted",
];

// 📥 GET ALL
export async function getLeads(): Promise<Lead[]> {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

// ➕ ADD
export async function addLead(data: {
  name: string;
  phone: string;
  source: LeadSource;
  notes?: string;
}) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add lead");
  return res.json();
}

// 🔄 UPDATE STATUS
export async function updateLeadStatus(id: number, status: LeadStatus) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Failed to update");
}

// ❌ DELETE
export async function deleteLead(id: number) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete");
}