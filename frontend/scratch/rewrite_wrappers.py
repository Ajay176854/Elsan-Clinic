import os
import glob
import re

files = glob.glob('frontend/src/app/elsanclinic/**/*-dashboard/**/page.tsx', recursive=True)
print("Rewriting", len(files), "files...")

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Search for the import statement like: import XXX from "YYY";
    match = re.search(r'import\s+(\w+)\s+from\s+[\'"]([^\'"]+)[\'"]', content)
    if match:
        original_name = match.group(1)
        import_path = match.group(2)
        
        new_content = f'''"use client";
import TargetPage from "{import_path}";

export default function Page() {{
  return <TargetPage />;
}}
'''
        with open(file_path, 'w') as f:
            f.write(new_content)
        print("Updated:", file_path)
    else:
        print("Skipped (no match):", file_path)
