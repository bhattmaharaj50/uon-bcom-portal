import { Phone, Mail, MapPin } from "lucide-react";

const contacts = [
  { role: "Class Representative", name: "John Kamau", phone: "+254 712 345 678", email: "john.kamau@students.uonbi.ac.ke" },
  { role: "Assistant Class Rep", name: "Mary Wanjiku", phone: "+254 723 456 789", email: "mary.wanjiku@students.uonbi.ac.ke" },
  { role: "Department Secretary", name: "Mrs. Agnes Nyambura", phone: "+254 20 318 262 ext. 28", email: "business@uonbi.ac.ke" },
  { role: "Academic Advisor", name: "Dr. Peter Ochieng", phone: "+254 20 318 262 ext. 45", email: "p.ochieng@uonbi.ac.ke" },
];

export default function Contacts() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Phone className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {contacts.map(c => (
          <div key={c.role} className="bg-card rounded-lg p-5 card-shadow">
            <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded">{c.role}</span>
            <h3 className="font-semibold text-card-foreground mt-2">{c.name}</h3>
            <div className="mt-3 space-y-1.5">
              <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" /> {c.phone}
              </a>
              <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" /> {c.email}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg p-5 card-shadow">
        <h3 className="font-semibold text-card-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" /> Campus Location
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          School of Business, Lower Kabete Campus<br />
          P.O. Box 30197 - 00100, Nairobi, Kenya
        </p>
      </div>
    </div>
  );
}
