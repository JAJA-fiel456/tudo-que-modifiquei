import MedicineForm from "@/components/medicine-form";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
        <MedicineForm />
      </div>
    </div>
  );
}
