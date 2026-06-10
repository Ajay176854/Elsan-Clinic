import sys

with open("frontend/src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Navigation Logic
nav_logic_old = """export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('home');"""

nav_logic_new = """export default function LandingPage() {
  const [activeTab, setActiveTabState] = useState('home');

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(tab);
    if (element) {
      // Account for fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };"""

content = content.replace(nav_logic_old, nav_logic_new)

# 2. Hero Video Carousel
content = content.replace("{activeTab === 'home' && <HeroVideoCarousel setActiveTab={setActiveTab} />}", "<HeroVideoCarousel setActiveTab={setActiveTab} />")

# 3. Main Content
main_content_old = """      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">"""

main_content_new = """      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 space-y-24">
        <div id="home">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">"""

content = content.replace(main_content_old, main_content_new)

# 4. Bottom Views
bottom_views_old = """          </motion.div>
        )}
        {activeTab === 'treatments' && <ServicesView onNavigate={() => setActiveTab('book')} />}
        {activeTab === 'doctors' && <DoctorsView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'book' && <BookView />}
        {activeTab === 'aitools' && <AIToolsView />}
        {activeTab === 'prohealth' && <HealthPackagesView onNavigate={() => setActiveTab('book')} />}
        {activeTab === 'emergency' && <EmergencyView />}
        {activeTab === 'nri' && <InternationalPatientsView />}
        {activeTab === 'library' && <HealthLibraryView />}
      </main>"""

bottom_views_new = """          </motion.div>
        </div>
        
        <div id="treatments" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <ServicesView onNavigate={() => setActiveTab('book')} />
        </div>
        
        <div id="doctors" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <DoctorsView />
        </div>
        
        <div id="book" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <BookView />
        </div>

        <div id="aitools" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <AIToolsView />
        </div>

        <div id="prohealth" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <HealthPackagesView onNavigate={() => setActiveTab('book')} />
        </div>

        <div id="emergency" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <EmergencyView />
        </div>

        <div id="nri" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <InternationalPatientsView />
        </div>

        <div id="library" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <HealthLibraryView />
        </div>

        <div id="contact" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <ContactView />
        </div>
      </main>"""

content = content.replace(bottom_views_old, bottom_views_new)

with open("frontend/src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
