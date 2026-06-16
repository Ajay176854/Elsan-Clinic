import os
import io
import base64
import qrcode
from datetime import datetime
from playwright.async_api import async_playwright
import urllib.request

class PrescriptionPDFGenerator:
    def __init__(self, clinic_data: dict, doctor_data: dict, patient_data: dict,
                 medicines: list, notes: str, next_visit: str, qr_code_bytes: bytes):
        self.clinic_data = clinic_data
        self.doctor_data = doctor_data
        self.patient_data = patient_data
        self.medicines = medicines
        self.notes = notes
        self.next_visit = next_visit
        self.qr_code_bytes = qr_code_bytes
        self._logo_base64 = ""
        self._load_logo()

    def _load_logo(self):
        """Load logo from the frontend public folder and convert to base64 for embedding in HTML"""
        import os
        # Assuming backend/pdf/prescription_generator.py, we go up two dirs to backend, then to frontend/public
        logo_path = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "public", "logo.png")
        if not os.path.exists(logo_path):
            print(f"Warning: Logo not found at {logo_path}")
            self._logo_base64 = ""
            return
            
        try:
            with open(logo_path, "rb") as f:
                logo_bytes = f.read()
            self._logo_base64 = "data:image/png;base64," + base64.b64encode(logo_bytes).decode('utf-8')
        except Exception as e:
            print(f"Warning: Could not read local clinic logo from {logo_path}: {e}")
            self._logo_base64 = ""

    def _get_qr_base64(self):
        if not self.qr_code_bytes:
            return ""
        return "data:image/png;base64," + base64.b64encode(self.qr_code_bytes).decode('utf-8')

    def _build_html(self) -> str:
        # Define English layout
        en_med_rows = ""
        for m in self.medicines:
            en_med_rows += f"""
            <tr>
                <td>{m.get('medicine_name', '')}</td>
                <td>{m.get('dosage', '')}</td>
                <td style="text-align: center;">{m.get('frequency', '')}</td>
                <td style="text-align: center;">{m.get('duration_days', '')} Days</td>
                <td>{m.get('instructions', '')}</td>
            </tr>
            """

        # Define Tamil layout
        ta_med_rows = ""
        for m in self.medicines:
            name = m.get('medicine_name', '')
            if name == "Prescription Medicine": name = "பரிந்துரைக்கப்பட்ட மருந்து"
            
            dosage = m.get('dosage', '')
            if dosage.lower() == "as directed": dosage = "மருத்துவர் அறிவுரைப்படி"
            
            instructions = m.get('instructions', '')
            if instructions.lower() == "before food": instructions = "உணவுக்கு முன்"
            elif instructions.lower() == "after food": instructions = "உணவுக்குப் பின்"
            elif instructions.lower() == "empty stomach": instructions = "வெறும் வயிற்றில்"
            elif instructions.lower() == "with milk": instructions = "பாலுடன்"
            elif instructions.lower() == "with water": instructions = "தண்ணீருடன்"
            
            ta_med_rows += f"""
            <tr>
                <td class="tamil-text">{name}</td>
                <td class="tamil-text">{dosage}</td>
                <td style="text-align: center;">{m.get('frequency', '')}</td>
                <td style="text-align: center;" class="tamil-text">{m.get('duration_days', '')} நாட்கள்</td>
                <td class="tamil-text">{instructions}</td>
            </tr>
            """

        logo_html = f'<img src="{self._logo_base64}" class="logo" />' if self._logo_base64 else ""
        qr_html = f'<img src="{self._get_qr_base64()}" class="qr-code" />' if self.qr_code_bytes else ""
        
        clinic_name = self.clinic_data.get('name', 'Elsan Clinic')
        clinic_address = self.clinic_data.get('address', '')
        clinic_phone = self.clinic_data.get('phone', '')
        clinic_email = self.clinic_data.get('email', '')
        clinic_website = self.clinic_data.get('website', '')
        
        doc_name = self.doctor_data.get('name', '')
        doc_spec = self.doctor_data.get('specialization', '')
        doc_qual = self.doctor_data.get('qualification', '')

        # HTML Template
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                @page {{
                    size: A4;
                    margin: 0;
                }}
                body {{
                    font-family: 'Inter', sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #1f2937;
                    background: white;
                }}
                .tamil-text {{
                    font-family: 'Noto Sans Tamil', sans-serif !important;
                }}
                .page {{
                    width: 210mm;
                    height: 297mm;
                    padding: 20mm;
                    box-sizing: border-box;
                    position: relative;
                }}
                .page-break {{
                    page-break-after: always;
                }}
                .header {{
                    display: flex;
                    align-items: center;
                    border-bottom: 2px solid #2563eb;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }}
                .logo {{
                    width: 80px;
                    height: 80px;
                    object-fit: contain;
                    margin-right: 20px;
                }}
                .clinic-info {{
                    flex-grow: 1;
                }}
                .clinic-name {{
                    font-size: 26px;
                    font-weight: 700;
                    color: #2563eb;
                    margin: 0 0 5px 0;
                }}
                .clinic-subtitle {{
                    font-size: 16px;
                    color: #4b5563;
                    margin: 0 0 5px 0;
                }}
                .clinic-contact {{
                    font-size: 11px;
                    color: #6b7280;
                    margin: 0;
                    line-height: 1.4;
                }}
                .doctor-section {{
                    margin-bottom: 25px;
                }}
                .doctor-name {{
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 4px 0;
                }}
                .doctor-spec {{
                    font-size: 12px;
                    color: #4b5563;
                    margin: 0;
                }}
                .patient-grid {{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    background: #f8fafc;
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                    margin-bottom: 30px;
                }}
                .patient-item {{
                    font-size: 12px;
                    display: flex;
                }}
                .patient-label {{
                    font-weight: 600;
                    width: 120px;
                    color: #475569;
                }}
                .patient-value {{
                    font-weight: 400;
                    color: #0f172a;
                }}
                .section-title {{
                    font-size: 16px;
                    font-weight: 700;
                    color: #2563eb;
                    margin: 0 0 15px 0;
                    border-bottom: 1px solid #bfdbfe;
                    padding-bottom: 5px;
                }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }}
                th {{
                    background: #f1f5f9;
                    color: #334155;
                    font-size: 12px;
                    font-weight: 600;
                    text-align: left;
                    padding: 10px;
                    border: 1px solid #cbd5e1;
                }}
                td {{
                    padding: 10px;
                    font-size: 12px;
                    border: 1px solid #cbd5e1;
                    color: #1e293b;
                }}
                .footer {{
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    right: 20px;
                }}
                .notes-section {{
                    margin-bottom: 20px;
                    font-size: 12px;
                }}
                .notes-section strong {{
                    color: #334155;
                }}
                .qr-container {{
                    text-align: center;
                    margin-top: 30px;
                }}
                .qr-code {{
                    width: 100px;
                    height: 100px;
                }}
                .bottom-text {{
                    text-align: center;
                    font-size: 10px;
                    color: #94a3b8;
                    margin-top: 10px;
                }}
                .whatsapp-badge {{
                    text-align: center;
                    color: #16a34a;
                    font-weight: 600;
                    font-size: 11px;
                    margin-top: 5px;
                }}
            </style>
        </head>
        <body>
            <!-- PAGE 1: ENGLISH -->
            <div class="page page-break">
                <div class="header">
                    {logo_html}
                    <div class="clinic-info">
                        <h1 class="clinic-name">{clinic_name}</h1>
                        <h2 class="clinic-subtitle">Prescription</h2>
                        <p class="clinic-contact">
                            {clinic_address}<br/>
                            Phone: {clinic_phone} {f" | Email: {clinic_email}" if clinic_email else ""}
                        </p>
                    </div>
                </div>

                <div class="doctor-section">
                    <p class="doctor-name">Dr. {doc_name}</p>
                    <p class="doctor-spec">{doc_qual} {f"| {doc_spec}" if doc_spec else ""}</p>
                </div>

                <div class="patient-grid">
                    <div class="patient-item">
                        <span class="patient-label">Patient Name:</span>
                        <span class="patient-value">{self.patient_data.get('name', '')}</span>
                    </div>
                    <div class="patient-item">
                        <span class="patient-label">Date:</span>
                        <span class="patient-value">{self.patient_data.get('date', '')}</span>
                    </div>
                    <div class="patient-item">
                        <span class="patient-label">Patient ID:</span>
                        <span class="patient-value">{self.patient_data.get('id', '')}</span>
                    </div>
                    <div class="patient-item">
                        <span class="patient-label">Age / Gender:</span>
                        <span class="patient-value">{self.patient_data.get('age', '')} / {self.patient_data.get('gender', '')}</span>
                    </div>
                    <div class="patient-item">
                        <span class="patient-label">Phone:</span>
                        <span class="patient-value">{self.patient_data.get('phone', '')}</span>
                    </div>
                </div>

                <h3 class="section-title">Medicine Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Dosage</th>
                            <th style="text-align: center;">Frequency (M-A-N)</th>
                            <th style="text-align: center;">Duration</th>
                            <th>Instructions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {en_med_rows}
                    </tbody>
                </table>

                <div class="footer">
                    {f'<div class="notes-section"><strong>Doctor Notes:</strong><br/>{self.notes}</div>' if self.notes else ''}
                    {f'<div class="notes-section"><strong>Next Visit:</strong> {self.next_visit}</div>' if self.next_visit else ''}
                    
                    <div class="qr-container">
                        {qr_html}
                    </div>
                    
                    <div class="bottom-text">This is a digitally generated prescription.</div>
                    <div class="whatsapp-badge">✓ Sent via WhatsApp</div>
                </div>
            </div>

            <!-- PAGE 2: TAMIL -->
            <div class="page">
                <div class="header">
                    {logo_html}
                    <div class="clinic-info">
                        <h1 class="clinic-name tamil-text">{clinic_name}</h1>
                        <h2 class="clinic-subtitle tamil-text">மருந்துச் சீட்டு</h2>
                        <p class="clinic-contact tamil-text">
                            {clinic_address}<br/>
                            தொலைபேசி: {clinic_phone}
                        </p>
                    </div>
                </div>

                <div class="doctor-section">
                    <p class="doctor-name tamil-text">மருத்துவர்: Dr. {doc_name}</p>
                    <p class="doctor-spec tamil-text">{f"சிறப்பு: {doc_spec}" if doc_spec else ""}</p>
                </div>

                <div class="patient-grid">
                    <div class="patient-item">
                        <span class="patient-label tamil-text">நோயாளி பெயர்:</span>
                        <span class="patient-value tamil-text">{self.patient_data.get('name', '')}</span>
                    </div>
                    <div class="patient-item">
                        <span class="patient-label tamil-text">தேதி:</span>
                        <span class="patient-value tamil-text">{'இன்று' if self.patient_data.get('date', '').lower() == 'today' else self.patient_data.get('date', '')}</span>
                    </div>
                    <div class="patient-item">
                        <span class="patient-label tamil-text">நோயாளி எண்:</span>
                        <span class="patient-value tamil-text">{self.patient_data.get('id', '')}</span>
                    </div>
                    <div class="patient-item">
                        <span class="patient-label tamil-text">வயது / பாலினம்:</span>
                        <span class="patient-value tamil-text">{self.patient_data.get('age', '')} / {'ஆண்' if self.patient_data.get('gender', '').lower() == 'male' else 'பெண்' if self.patient_data.get('gender', '').lower() == 'female' else self.patient_data.get('gender', '')}</span>
                    </div>
                    <div class="patient-item">
                        <span class="patient-label tamil-text">தொலைபேசி:</span>
                        <span class="patient-value tamil-text">{self.patient_data.get('phone', '')}</span>
                    </div>
                </div>

                <h3 class="section-title tamil-text">மருந்து விவரங்கள்</h3>
                <table>
                    <thead>
                        <tr>
                            <th class="tamil-text">மருந்து பெயர்</th>
                            <th class="tamil-text">அளவு</th>
                            <th style="text-align: center;" class="tamil-text">காலை-மதியம்-இரவு</th>
                            <th style="text-align: center;" class="tamil-text">நாட்கள்</th>
                            <th class="tamil-text">அறிவுரை</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ta_med_rows}
                    </tbody>
                </table>

                <div class="footer">
                    {f'<div class="notes-section tamil-text"><strong>மருத்துவர் குறிப்புகள்:</strong><br/>{self.notes}</div>' if self.notes else ''}
                    {f'<div class="notes-section tamil-text"><strong>மறுபரிசீலனை தேதி:</strong> {self.next_visit}</div>' if self.next_visit else ''}
                    
                    <div class="qr-container">
                        {qr_html}
                    </div>
                    
                    <div class="bottom-text tamil-text">இது கணினி மூலம் உருவாக்கப்பட்ட மருந்துச் சீட்டு.</div>
                    <div class="whatsapp-badge tamil-text">✓ வாட்ஸ்அப் வழியாக அனுப்பப்பட்டது</div>
                </div>
            </div>
        </body>
        </html>
        """
        return html

    async def generate(self) -> bytes:
        html_content = self._build_html()
        
        import sys
        if sys.platform != 'win32':
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                # Wait for fonts to load
                await page.set_content(html_content, wait_until="networkidle")
                pdf_bytes = await page.pdf(
                    format="A4", 
                    print_background=True, 
                    margin={"top": "0px", "bottom": "0px", "left": "0px", "right": "0px"}
                )
                await browser.close()
                return pdf_bytes
                
        # On Windows, we run it in a separate thread with ProactorEventLoop to support subprocesses under Uvicorn's SelectorEventLoop
        import threading
        import asyncio
        
        pdf_bytes_container = []
        error_container = []
        
        def run_in_proactor_thread():
            try:
                # Force WindowsProactorEventLoopPolicy for this thread
                asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                
                async def runner():
                    async with async_playwright() as p:
                        browser = await p.chromium.launch(headless=True)
                        page = await browser.new_page()
                        await page.set_content(html_content, wait_until="networkidle")
                        data = await page.pdf(
                            format="A4", 
                            print_background=True, 
                            margin={"top": "0px", "bottom": "0px", "left": "0px", "right": "0px"}
                        )
                        await browser.close()
                        return data
                        
                try:
                    res = loop.run_until_complete(runner())
                    pdf_bytes_container.append(res)
                finally:
                    loop.close()
            except Exception as e:
                error_container.append(e)
                
        thread = threading.Thread(target=run_in_proactor_thread)
        thread.start()
        # Wait for thread to finish
        thread.join()
        
        if error_container:
            raise error_container[0]
            
        return pdf_bytes_container[0]
