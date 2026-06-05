import os
import re

def move_content(src_path, dest_path):
    if not os.path.exists(src_path):
        return False
        
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Fix relative imports in the content since it's moving from src/ or src/screens/ to src/app/
    # For LandingPage (src/ -> src/app/)
    if 'LandingPage' in src_path:
        content = content.replace("from './data'", "from '../data'")
        content = content.replace("from './components/", "from '../components/")
        
    # For screens (src/screens/ -> src/app/[route]/)
    if 'LoginPage' in src_path:
        content = content.replace("from '../schemas'", "from '../../schemas'")
        content = content.replace("from '../services'", "from '../../services'")
        
    if 'DashboardPage' in src_path:
        content = content.replace("from '../components/", "from '../../components/")
        content = content.replace("from '../hooks'", "from '../../hooks'")
        
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    os.remove(src_path)
    print(f"Moved {src_path} into {dest_path}")
    return True

def main():
    print("Flattening codebase into Next.js app directory...")
    
    # Move LandingPage into app/page.tsx
    move_content('src/LandingPage.tsx', 'src/app/page.tsx')
    
    # Move LoginPage into app/login/page.tsx
    move_content('src/screens/LoginPage.tsx', 'src/app/login/page.tsx')
    
    # Move DashboardPage into app/dashboard/page.tsx
    # Wait, DashboardPage has the DashboardOverview and the main component.
    # We will just move it entirely.
    move_content('src/screens/DashboardPage.tsx', 'src/app/dashboard/page.tsx')

if __name__ == '__main__':
    main()
