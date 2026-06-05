import os
import shutil
import json
import re

SOURCE_DIR = "frontend/src"
DEST_DIR = "frontend-next/src"

def migrate_file(filepath, dest_filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine if client component
    needs_client = False
    if 'use client' not in content:
        if 'useState' in content or 'useEffect' in content or 'framer-motion' in content or 'useRouter' in content or 'usePathname' in content or 'onClick' in content or 'react-hook-form' in content or 'createContext' in content or 'useContext' in content:
            needs_client = True

    # Replace react-router-dom with Next.js navigation
    content = content.replace("from 'react-router-dom'", "from 'next/navigation'")
    content = content.replace("useNavigate", "useRouter")
    content = content.replace("useLocation", "usePathname")
    
    # Handle Link imports and usages
    # import { Link } from 'react-router-dom' -> import Link from 'next/link'
    content = re.sub(r"import\s+\{([^}]*)\bLink\b([^}]*)\}\s+from\s+['\"]react-router-dom['\"];?", r"import Link from 'next/link';\nimport {\1\2} from 'next/navigation';", content)
    # clean up empty import {} from 'next/navigation'
    content = re.sub(r"import\s+\{\s*\}\s+from\s+['\"]next/navigation['\"];?", "", content)
    
    # Link to="..." -> Link href="..."
    content = re.sub(r"<Link([^>]+)to=", r"<Link\1href=", content)
    
    # Outlet -> children
    content = content.replace("<Outlet />", "{children}")
    if "import { Outlet }" in content:
        content = content.replace("import { Outlet }", "import { }")

    if needs_client:
        content = '"use client";\n\n' + content

    os.makedirs(os.path.dirname(dest_filepath), exist_ok=True)
    with open(dest_filepath, 'w', encoding='utf-8') as f:
        f.write(content)


def main():
    if not os.path.exists(DEST_DIR):
        print(f"Waiting for {DEST_DIR} to be created by create-next-app...")
        return
        
    print("Copying components and adapting imports...")
    
    # Iterate all files in source
    for root, dirs, files in os.walk(SOURCE_DIR):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                src_path = os.path.join(root, file)
                rel_path = os.path.relpath(src_path, SOURCE_DIR)
                dest_path = os.path.join(DEST_DIR, rel_path)
                migrate_file(src_path, dest_path)
            elif file.endswith('.css'):
                src_path = os.path.join(root, file)
                rel_path = os.path.relpath(src_path, SOURCE_DIR)
                if rel_path == 'index.css':
                    # Next uses globals.css by default
                    dest_path = os.path.join(DEST_DIR, 'app/globals.css')
                else:
                    dest_path = os.path.join(DEST_DIR, rel_path)
                os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                shutil.copy2(src_path, dest_path)

    print("Setting up App Router pages...")
    
    # Clean default Next.js pages
    os.makedirs(os.path.join(DEST_DIR, 'app'), exist_ok=True)
    
    # globals.css is already copied.
    
    # Create layout.tsx
    layout_code = '''
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elsan Clinic",
  description: "Advanced Clinic Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
'''
    with open(os.path.join(DEST_DIR, 'app/layout.tsx'), 'w', encoding='utf-8') as f:
        f.write(layout_code)

    # Create page.tsx (Landing Page)
    page_code = '''"use client";
import LandingPage from '../LandingPage';

export default function Home() {
  return <LandingPage />;
}
'''
    with open(os.path.join(DEST_DIR, 'app/page.tsx'), 'w', encoding='utf-8') as f:
        f.write(page_code)
        
    # Create login page
    os.makedirs(os.path.join(DEST_DIR, 'app/login'), exist_ok=True)
    with open(os.path.join(DEST_DIR, 'app/login/page.tsx'), 'w', encoding='utf-8') as f:
        f.write('''"use client";
import LoginPage from '../../pages/LoginPage';

export default function Login() {
  return <LoginPage />;
}
''')

    # Create dashboard layout and pages
    os.makedirs(os.path.join(DEST_DIR, 'app/dashboard'), exist_ok=True)
    with open(os.path.join(DEST_DIR, 'app/dashboard/layout.tsx'), 'w', encoding='utf-8') as f:
        f.write('''"use client";
import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navbar } from '../../components/layout/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
''')

    with open(os.path.join(DEST_DIR, 'app/dashboard/page.tsx'), 'w', encoding='utf-8') as f:
        f.write('''"use client";
import DashboardPage from '../../pages/DashboardPage';

export default function Dashboard() {
  return <DashboardPage />;
}
''')

    # Now copy package dependencies from frontend to frontend-next
    with open('frontend/package.json', 'r') as f:
        old_pkg = json.load(f)
        
    with open('frontend-next/package.json', 'r') as f:
        new_pkg = json.load(f)
        
    deps_to_copy = ['axios', 'date-fns', 'framer-motion', 'lucide-react', 'react-hook-form', 'zod', '@hookform/resolvers', 'recharts', 'clsx', 'tailwind-merge', 'html2canvas', 'jspdf']
    for dep in deps_to_copy:
        if dep in old_pkg.get('dependencies', {}):
            new_pkg['dependencies'][dep] = old_pkg['dependencies'][dep]
            
    with open('frontend-next/package.json', 'w') as f:
        json.dump(new_pkg, f, indent=2)

    print("Migration complete. Run 'npm install' in frontend-next.")

if __name__ == '__main__':
    main()
