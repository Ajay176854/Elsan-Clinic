import os

BASE_DIR = "src/app/dashboard"
COMPONENTS_DIR = "../../../components/dashboard"

pages = {
    "doctors": "DoctorsTable",
    "staff": "StaffTable",
    "patients": "PatientSearch",
    "appointments": "AppointmentCard",
    "prescriptions": "PrescriptionForm",
    "settings": "SettingsPanel",
    "telemedicine": "" # Telemedicine is a placeholder in original code
}

for route, component in pages.items():
    route_dir = os.path.join(BASE_DIR, route)
    os.makedirs(route_dir, exist_ok=True)
    
    page_path = os.path.join(route_dir, "page.tsx")
    if component == "":
        content = f'''"use client";

export default function Telemedicine() {{
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Telemedicine Room</h2>
      <p className="text-slate-500">This module is being migrated to the new architecture.</p>
    </div>
  );
}}
'''
    else:
        content = f'''"use client";
import {{ {component} }} from '{COMPONENTS_DIR}';

export default function {component}Page() {{
  return <{component} />;
}}
'''
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created {page_path}")
