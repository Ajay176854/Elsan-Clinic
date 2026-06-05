import os

BASE_DIR = 'frontend-next/src/app/dashboard'

pages = {
    'doctors': '''"use client";
import { DoctorsTable } from '../../../components/dashboard';

export default function DoctorsPage() {
  return <DoctorsTable />;
}
''',
    'staff': '''"use client";
import { StaffTable } from '../../../components/dashboard';

export default function StaffPage() {
  return <StaffTable />;
}
''',
    'patients': '''"use client";
import { PatientSearch } from '../../../components/dashboard';

export default function PatientsPage() {
  return <PatientSearch />;
}
''',
    'appointments': '''"use client";
import { AppointmentCard } from '../../../components/dashboard';

export default function AppointmentsPage() {
  return <AppointmentCard />;
}
''',
    'telemedicine': '''"use client";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500">This module is being migrated to the new architecture.</p>
    </div>
  );
}

export default function TelemedicinePage() {
  return <Placeholder title="Telemedicine Room" />;
}
''',
    'prescriptions': '''"use client";
import { PrescriptionForm } from '../../../components/dashboard';

export default function PrescriptionsPage() {
  return <PrescriptionsPage />;
}
''',
    'settings': '''"use client";
import { SettingsPanel } from '../../../components/dashboard';

export default function SettingsPage() {
  return <SettingsPanel />;
}
'''
}

for route, code in pages.items():
    dir_path = os.path.join(BASE_DIR, route)
    os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, 'page.tsx')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(code)

print("Dashboard routes successfully migrated to Next.js App Router!")
