import os

admin_pages = [
    "appointments",
    "audit-logs",
    "doctors",
    "inpatients",
    "medicines",
    "patients",
    "permissions",
    "reports",
    "settings",
    "staff",
    "whatsapp"
]

staff_pages = [
    "appointments",
    "patients",
    "inpatients"
]

doctor_pages = [
    "appointments",
    "prescriptions",
    "telemedicine"
]

def write_wrapper(dashboard_dir, subpage):
    target_dir = f"frontend/src/app/elsanclinic/{dashboard_dir}/{subpage}"
    os.makedirs(target_dir, exist_ok=True)
    
    file_content = f'''"use client";
import TargetPage from "../../../admin/{subpage}/page";

export default function Page() {{
  return <TargetPage />;
}}
'''
    with open(f"{target_dir}/page.tsx", "w") as f:
        f.write(file_content)
    print(f"Created {target_dir}/page.tsx")

# Write all wrappers
for page in admin_pages:
    write_wrapper("admin-dashboard", page)

for page in staff_pages:
    write_wrapper("staff-dashboard", page)

for page in doctor_pages:
    write_wrapper("doctor-dashboard", page)

print("All wrapper pages created successfully!")
