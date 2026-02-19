import { Calendar } from "lucide-react";

const timetable = [
  { day: "Monday", slots: [{ time: "14:00 - 17.00", course: "DMP3202", unit: "Fundamentals of Supply Chain Management", venue: "Biashara Hall" }] },
  { day: "Tuesday", slots: [{ time: "11:00 - 14:00", course: "DBH3202", unit: "Management of Human Resources", venue: "NLT " }, { time: "14:00 - 17:00", course: "DBM3204", unit: "Principles of Marketing", venue: "NLT" }] },
  { day: "Wednesday", slots: [{ time: "8:00 - 11:00", course: "DFA3212", unit: "Principles of Taxation", venue: "NTB3" }] },
  { day: "Thursday", slots: [{ time: "11:00 - 14:00", course: "DFF3224", unit: "Financial Institutions and Markets", venue: "Biashara Hall" }] },
  { day: "Friday", slots: [{ time: "8:00 - 11:00", course: "DFA3204", unit: "Principles of Internal Controls and Corporate Governance", venue: "Biashara Hall" }] },
];

export default function Timetable() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Class Timetable</h1>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-card rounded-lg card-shadow overflow-hidden">
          <thead>
            <tr className="hero-gradient text-primary-foreground">
              <th className="px-4 py-3 text-left text-sm font-semibold">Day</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Course</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Unit</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Venue</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map(({ day, slots }) =>
              slots.map((slot, i) => (
                <tr key={`${day}-${i}`} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  {i === 0 && (
                    <td rowSpan={slots.length} className="px-4 py-3 text-sm font-semibold text-foreground bg-secondary/30 border-r border-border align-top">
                      {day}
                    </td>
                  )}
                  <td className="px-4 py-3 text-sm text-muted-foreground">{slot.time}</td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">{slot.course}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{slot.unit}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{slot.venue}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {timetable.map(({ day, slots }) => (
          <div key={day} className="bg-card rounded-lg card-shadow overflow-hidden">
            <div className="hero-gradient px-4 py-2 text-primary-foreground font-semibold text-sm">{day}</div>
            <div className="divide-y divide-border">
              {slots.map((slot, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{slot.course}</span>
                    <span className="text-xs text-muted-foreground">{slot.time}</span>
                  </div>
                  <p className="text-sm text-foreground mt-0.5">{slot.unit}</p>
                  <p className="text-xs text-muted-foreground">📍 {slot.venue}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
