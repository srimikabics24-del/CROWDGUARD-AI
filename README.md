# CROWDGUARD AI
### Context-Aware Harassment Response and Bystander Coordination Platform

> **Hackathon Evaluation Notice:**  
> This project is a working prototype built for hackathon demonstration. It uses deterministic safety heuristics and local browser storage (`localStorage`). It is **not** connected to 911, real police, or actual transit operators, does not collect personal identifiable information (PII), does not employ facial recognition or criminal profiling, and does not make automated accusations.

---

## 🌟 Overview & Core Value Proposition

Public transit vehicles (buses, subways, light rail) are enclosed spaces where direct confrontation can rapidly escalate into physical violence. **CROWDGUARD AI** provides a discreet, multi-tier coordination bridge between three critical transit actors:
1. **Passengers in Distress:** Can request low-key assistance quietly without drawing attention, with an instant "Camouflage Disguise" (fake transit departure timetable) if someone glances at their screen.
2. **Nearby Peer Helpers (Bystanders):** Receive actionable, **safe, non-confrontational guidance** based on the proven 5 D's framework (Distract, Delegate, Delay, Direct, Document) with ready-to-use distraction scripts (e.g., asking for the time or directions).
3. **Transport Staff & Dispatchers:** Receive a structured incident queue with urgency triage, dispatch windows, carriage/platform details, status lifecycle updates, and timestamped follow-up logs.

---

## 🚀 Key Features

### 1. Passenger Discreet Safe-Zone
- **Discreet Request Flow:** Quick selection of situation (`unwanted attention`, `verbal harassment`, `unwanted touching`, `following`, `other`).
- **Support Channels:** Bystander helper only, Transport staff only, or Both.
- **Urgency Levels:** Low (monitoring), Moderate (active concern), High (urgent intervention).
- **Location Pinpointing:** Transit line, carriage/seat, stop/station, and non-accusatory notes.
- **Consent Gate:** Explicit consent checkbox required prior to coordination dispatch.
- **Camouflage Mode (Discreet Screen Mask):** 1-click button or keyboard shortcut (`ESC`) that disguises the screen as a live Metro Transit departure timetable.
- **Live Response Plan & Tracker:** Displays the customized de-escalation plan, helper acceptance status, staff dispatch log, and timeline progression (`New` → `Acknowledged` → `Responding` → `Closed`).

### 2. Bystander Helper Hub
- **Queue of Active Requests:** See nearby passengers needing peer support.
- **1-Click Role Acceptance:** Mark yourself as an active supportive bystander.
- **Strict Non-Confrontation Directive:** Prominent warning: *Never confront, stare at, or accuse the suspected harasser.*
- **Pre-Scripted Neutral Distraction Phrases:**
  - *"Excuse me! Do you know if this train stops at Central Station next?"*
  - *"Hi! Mind if I sit right here? My legs are exhausted today."*
  - *"Hey, excuse me, did you happen to drop this metro transit card?"*
- **The Safe 5 D's Framework Guide:** Distract, Delegate, Delay, Direct, Document.

### 3. Transport Staff Console
- **Search & Filter:** Search by ID, line, vehicle, or station; filter by status and urgency.
- **Incident Lifecycle Management:** Update status through `New`, `Acknowledged`, `Responding`, and `Closed`.
- **Field Notes & Audit Trail:** Add timestamped dispatcher and field officer notes with author tags.
- **Triage Level:** Auto-assigned priority (`P1 - High Priority`, `P2 - Elevated`, `P3 - Standard Advisory`).

### 4. Context-Aware Response Engine
- **Deterministic & Auditable:** Pure JavaScript rule-based evaluation (`src/services/responseEngine.js`).
- **Explainable Reasoning:** Every recommendation includes a plain-English explanation of why it was chosen based on situation severity, urgency tier, and support preferences.
- **Engine Explorer Sandbox:** A dedicated interactive testing ground where evaluators can tweak any variable and view the real-time reasoning trace.

### 5. Design & Tech Stack
- **Tech:** React 18 + Vite 6 + JavaScript + CSS3 + Lucide Icons.
- **Design System:** Deep navy palette (`#070c18`, `#0d1527`, `#121c33`) with electric teal accents (`#00f2fe`), glassmorphism cards, responsive layouts, accessible typography (`Inter` & `Outfit`), and high-contrast status badges.
- **Storage:** Local browser `localStorage` with a 1-click "Reset Demo Data" feature.

---

## 💻 How to Run the Project Locally

### Prerequisites
- Node.js (v18 or higher) and npm installed.

### Simple Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   - Open your browser and navigate to the local URL shown in your terminal (typically `http://localhost:5173`).

4. **Build for production (optional):**
   ```bash
   npm run build
   ```

---

## 🧪 Recommended Evaluation & Testing Walkthrough

1. **Overview Dashboard:** Review the live system statistics (Active Incidents, Bystander Interventions, Staff Units En Route) and recent requests table.
2. **Test Passenger Flow:**
   - Click **"Passenger Request"** in the navigation.
   - Select a situation (e.g., *Verbal Harassment*), set urgency to *High*, choose *Both*, enter carriage details, check the consent box, and submit.
   - Observe the immediate generated safety steps, transparent rule explanation, and active tracking timeline.
   - Click **"Discreet Mode"** (or press `ESC`) to see how the screen instantly disguises into an MTA train schedule.
3. **Test Helper Coordination:**
   - Switch to **"Helper Hub"**.
   - Notice the new active request. Click **"Accept Support Role"**.
   - Read the tailored distraction scripts and the non-confrontational safety principles.
4. **Test Staff Console:**
   - Switch to **"Staff Console"**.
   - Search or filter the queue. Click on the incident and update its status from `Acknowledged` to `Responding`.
   - Type a follow-up note (e.g., *"Platform guard in position at door 2"*) and press Add Note.
   - Return to the Passenger tab to see how the status timeline updated in real-time.
5. **Audit the Rule Engine:**
   - Go to **"Engine Explorer"** to inspect the deterministic reasoning engine and observe why specific protocols are recommended.
6. **Reset Anytime:**
   - Click the **"Reset Demo"** button in the top right to restore the demo dataset to initial conditions.
