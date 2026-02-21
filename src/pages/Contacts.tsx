import { Phone, Mail, MapPin } from "lucide-react";

const contacts = [
  { role: "Class Representative", name: "Gerald Odhiambo", phone: "+254 713 009 074", email: "odhiambogerald006@gmail.com" },
  { role: "Assistant Class Rep", name: "Rachel Lesuyai", phone: "+254 781 315 872", email: "rachellesuyai@gmail.com" }
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
