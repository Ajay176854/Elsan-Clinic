# ELSAN CLINIC - 5 DAY DEVELOPMENT PLAN

## Day 1 - Foundation & Project Setup

### Ajay (Frontend Lead)

* Next.js Project Setup
* Tailwind + Shadcn Setup
* Authentication UI
* Landing Page Layout
* Navbar & Footer
* Responsive Framework

Branch:
feature/frontend-foundation

---

### Ajay (Backend Lead)

* FastAPI Project Setup
* PostgreSQL Connection
* JWT Authentication Setup
* User Model
* Role Management (Admin/Doctor/Receptionist)
* Environment Configuration

Branch:
feature/backend-foundation

---

### Veera (Database & DevOps)

* PostgreSQL Schema Design
* Create Tables

  * users
  * doctors
  * patients
  * appointments
  * visits
  * prescriptions
  * medicines
  * whatsapp_logs
* Cloudinary Integration Setup
* GitHub Actions Setup

Branch:
feature/database-setup

---

## Day 2 - Landing Website & Staff Management

### Ajay

* Home Page
* Services Page
* Doctors Page
* About Page
* Contact Page
* Appointment Page
* Tamil/English Switch

Branch:
feature/landing-pages

---

### veera

* Login API
* Staff CRUD APIs
* Doctor CRUD APIs
* Admin Dashboard APIs
* Role Based Middleware

Branch:
feature/staff-management

---

### Veera

* Admin Dashboard UI
* Staff Management UI
* Doctor Management UI
* Settings UI

Branch:
feature/admin-module

---

## Day 3 - Patient & Appointment Module

### Ajay

* Patient Registration UI
* Patient Search UI
* Patient History UI
* Appointment UI

Branch:
feature/patient-ui

---

### Ajay

* Patient CRUD APIs
* Patient Search APIs
* Patient History APIs
* Appointment APIs

Branch:
feature/patient-api

---

### Veera

* API Integration
* Form Validation
* Appointment Dashboard
* Visit Entry UI

Branch:
feature/patient-integration

---

## Day 4 - Prescription Engine

### Ajay

* Prescription Editor UI
* Medicine Table UI
* PDF Preview UI

Branch:
feature/prescription-ui

---

### veera

* Prescription APIs
* Medicine APIs
* ReportLab PDF Generator
* QR Code Generation

Branch:
feature/prescription-engine

---

### Veera

* Cloudinary Upload
* Prescription History
* PDF Download
* Doctor Signature Upload

Branch:
feature/pdf-storage

---

## Day 5 - WhatsApp + Reports + Testing

### Ajay

* Dashboard Charts UI
* Reports UI
* Final Responsive Fixes
* Bug Fixes

Branch:
feature/reports-ui

---

### Ajay

* WhatsApp API Integration
* Delivery Status APIs
* Follow-up Reminder APIs
* Audit Logs

Branch:
feature/whatsapp-module

---

### Veera

* End-to-End Testing
* API Testing
* Deployment Setup
* Production Environment Setup
* Documentation

Branch:
feature/deployment

---

# Final Deliverables

### Website

✅ Home
✅ Services
✅ Doctors
✅ About
✅ Contact
✅ Appointment Booking
✅ Chatbot Widget

### Admin

✅ Dashboard
✅ Staff Management
✅ Doctor Management
✅ Reports
✅ Settings

### Receptionist

✅ Patient Registration
✅ Search Patient
✅ Appointment Management
✅ Visit Entry

### Doctor

✅ Patient History
✅ Prescription Creation
✅ PDF Generation
✅ WhatsApp Send

### Backend

✅ Authentication
✅ Role Management
✅ Patient Management
✅ Prescription Engine
✅ Reports API
✅ WhatsApp API

### Infrastructure

✅ PostgreSQL
✅ Cloudinary
✅ JWT Security
✅ Audit Logs
✅ Deployment

---

# ELSAN CLINIC MANAGEMENT SYSTEM
## Software Requirement Specification (SRS) & Technical Architecture

### Project Overview
Elsan Clinic requires a modern digital platform consisting of:
1. Public Clinic Landing Website
2. Staff Management Portal
3. Patient Management System
4. Digital Prescription Generator
5. WhatsApp Prescription Delivery System
6. Appointment Booking System
7. Patient History Management
8. Admin Dashboard & Analytics

The system should work on both Desktop and Mobile devices and support English and Tamil languages.

---

### Business Goals
**Primary Objectives**
* Eliminate handwritten prescriptions
* Maintain centralized patient records
* Send prescriptions directly via WhatsApp
* Reduce patient waiting time
* Enable doctor and receptionist workflow automation
* Build professional online presence for the clinic

---

### User Roles
**1. Super Admin**
Permissions:
* Manage clinic settings
* Create and manage staff accounts
* Add/edit doctors
* View all patients
* View all prescriptions
* Access reports and analytics
* Manage WhatsApp configuration
* Manage website content

**2. Receptionist**
Permissions:
* Register patients
* Search patients
* Manage appointments
* Update patient information
* View patient history
* Create visit records

**3. Doctor**
Permissions:
* View assigned patients
* Create prescriptions
* Add medicines
* Add instructions
* Add next visit date
* Send prescriptions
* View treatment history

---

### Public Website Requirements
**Pages**

* **Home Page**
  * Hero Banner
  * Clinic Introduction
  * Services Overview
  * Doctor Highlights
  * Appointment CTA
  * Testimonials
  * Contact Information

* **Services Page**
  * General Consultation
  * Specialist Services
  * Health Checkups
  * Follow-up Services

* **Doctors Page**
  * Doctor Photo
  * Qualification
  * Specialization
  * Experience
  * Consultation Timings

* **About Page**
  * Clinic Story
  * Mission
  * Vision
  * Team Information

* **Contact Page**
  * Address
  * Google Maps
  * Contact Numbers
  * Email
  * Working Hours

* **Appointment Booking Page**
  * Patient can submit: Name, Phone Number, Preferred Doctor, Date, Time, Notes

* **Chatbot**
  * Functions: Clinic Timings, Doctor Availability, Services, Address, Appointment Information
  * Future: AI-powered medical assistance

---

### Patient Management Module
* **Patient Registration**: Patient Name, Age, Gender, Phone Number, Blood Group, Address, Medical History, Symptoms
* **Patient Search**: Name, Phone Number, Patient ID
* **Patient History**: Previous Visits, Prescriptions, Diagnoses, Follow-up Records

---

### Visit Management Module
* **Create Visit**: Visit Date, Symptoms, Diagnosis, Doctor Notes
* **Follow-up**: Next Visit Date, Reminder Notes

---

### Prescription Management
**Prescription Information**
* **Header**: Clinic Logo, Clinic Name, Address, Contact Number
* **Doctor Details**: Doctor Name, Qualification, Signature
* **Patient Details**: Patient Name, Age, Gender, Date
* **Prescription Details**: Medicines, Dosage, Frequency, Duration, Instructions, Next Visit Date

**Medicine Entry Methods**
* Option 1: Manual Entry
* Option 2: Medicine Search Database (Example: Paracetamol 650mg, Morning: 1, Afternoon: 0, Night: 1, Days: 5, Instructions: After Food)

**PDF Generation**
Generate professional PDF with: Clinic Logo, Doctor Signature, QR Verification, Prescription Details (File Format: PDF)

---

### WhatsApp Integration
* **Requirements**: Clinic WhatsApp Business Number Required
* **Features**: Send PDF Prescription, Send Text Summary, Delivery Status Tracking (Sent, Delivered, Read, Failed)

**WhatsApp Message Format**
```
Hello [Patient Name],
Your prescription from Elsan Clinic is attached.

Doctor: [Doctor Name]
Next Visit: [Date]

Thank You.
```

**Follow-Up Automation**
System should support: Appointment Reminders, Follow-up Notifications, Prescription Delivery Notifications

---

### Admin Dashboard
* **Dashboard Cards**: Total Patients, Total Visits, Total Prescriptions, Appointments Today, WhatsApp Deliveries
* **Reports**: Daily Report, Weekly Report, Monthly Report, Doctor-wise Report, Patient Statistics
* **Analytics**: Patient Growth, Doctor Performance, Visit Statistics, Prescription Trends

---

### Multilingual Support
* Languages: English, Tamil
* Dynamic Language Switching Required

---

### Authentication & Security
* **Authentication**: JWT Based Authentication
* **Password Security**: BCrypt Hashing
* **Security Requirements**: HTTPS, Session Control, Audit Logs, Role Based Access Control

---

### Technical Architecture
**Frontend**
* Technology: Next.js 15, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion
* Responsibilities: Landing Website, Dashboard UI, Appointment Booking, Chatbot Interface

**Backend**
* Technology: FastAPI (Python)
* Responsibilities: Authentication, Patient Management, Prescription Engine, WhatsApp APIs, Reporting APIs

**Database**
* Technology: PostgreSQL
* Tables: users, doctors, patients, appointments, visits, prescriptions, medicines, whatsapp_logs

**Storage**
* Technology: Cloudinary
* Store: Clinic Logo, Doctor Signature, Prescription PDFs

**PDF Engine**
* Technology: ReportLab

**WhatsApp Provider**
* Technology: Meta WhatsApp Business API

**Hosting**
* Frontend: Vercel
* Backend: Railway / AWS EC2
* Database: PostgreSQL
* Storage: Cloudinary

---

### System Flow
Patient Visits Clinic -> Receptionist Registers Patient -> Patient Record Created -> Doctor Opens Patient Record -> Doctor Creates Prescription -> PDF Generated -> PDF Stored in Cloudinary -> WhatsApp Sent to Patient -> Delivery Status Updated -> Patient History Saved

---

### Proposed Folder Structure
```text
frontend/
├── app/
├── components/
├── features/
│ ├── patients/
│ ├── prescriptions/
│ ├── appointments/
│ └── dashboard/
├── services/
├── hooks/
├── lib/
backend/
├── api/
├── models/
├── schemas/
├── services/
├── repositories/
├── auth/
├── whatsapp/
├── pdf/
├── reports/
└── database/
```

---

### Future Enhancements
**Phase 2**
* Online Payments
* Video Consultation
* AI Medical Assistant
* SMS Integration
* Lab Report Management
* Mobile Application
* Appointment Reminders Automation
* QR Patient Check-in

---

### Estimated Development Phases
* Phase 1: Landing Website
* Phase 2: Authentication & Staff Management
* Phase 3: Patient Management
* Phase 4: Prescription Engine
* Phase 5: WhatsApp Integration
* Phase 6: Reports & Analytics
* Phase 7: Testing & Deployment

---

### Project Status:
Production Ready Architecture Recommended
Stack: Next.js + FastAPI + PostgreSQL + Cloudinary + Meta WhatsApp API

```text
Landing Website
    │
    ├── Home
    ├── Services
    ├── Doctors
    ├── About
    ├── Contact
    └── Appointment

Admin Login
    │
    ├── Dashboard
    ├── Staff Management
    ├── Doctors
    ├── Patients
    ├── Prescriptions
    ├── Reports
    └── Settings

Receptionist
    │
    ├── Register Patient
    ├── Search Patient
    ├── Appointments
    └── Visit Entry

Doctor
    │
    ├── Patient List
    ├── Patient History
    ├── Prescription Editor
    ├── Generate PDF
    └── Send WhatsApp
```
