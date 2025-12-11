2.1 Product Perspective

Kabiraj AI operates as a standalone cloud-based system. It integrates with:

Payment Gateways: UPI (GPay, PhonePe), Netbanking.

Cloud Communication: WebRTC for video/audio, WebSocket for real-time signaling.

AI Services: Speech-to-Text (STT), Text-to-Speech (TTS), and Translation APIs.

Notification Services: WhatsApp Business API, SMS Gateways (Firebase/Twilio).

2.2 User Classes and Characteristics

The Patient (Seeker):

Literacy: Low to Medium.

Tech Proficiency: Low.

Network: Frequently on 2G/3G or unstable 4G.

Primary Need: Trust, ease of access, language support.

The Doctor (Healer):

Tech Proficiency: Medium to High.

Constraints: Extremely time-poor; intolerant of slow interfaces.

Primary Need: Efficiency, automated documentation, verified payments.

The Sahayak (Agent):

Role: Intermediate user booking on behalf of others.

Primary Need: Management of multiple sub-profiles, commission tracking.

3. Functional Requirements

3.1 Module 1: User Onboarding & Identity

FR-01: Mobile Authentication

System shall allow login/signup via Mobile Number + OTP.

Email shall be optional.

FR-02: Role Selection

Upon first login, user must select a role: Patient, Doctor, or Sahayak.

Doctor role requires an approval workflow (uploading Medical Registration Certificate).

FR-03: Family Profiles (The Vault)

A primary user shall be able to create up to 6 sub-profiles (e.g., Parent, Child).

Each sub-profile must maintain its own medical history and vital stats.

3.2 Module 2: Smart Search & Booking

FR-04: Voice-First Search

System shall accept voice input (e.g., "Chest pain") in supported local languages.

NLP engine shall map voice intent to medical specialties (e.g., "Chest pain" -> "Cardiologist").

FR-05: Doctor Discovery & Filtering

Users shall filter doctors by Specialty, Experience, Gender, and Consultation Fee.

Search results must indicate "Online/Offline" status.

FR-06: Calendar Management

Doctors shall define availability slots.

System shall prevent double-booking of slots.

3.3 Module 3: Appointment & Queue Management

FR-07: Live Token Tracking

System shall display a dynamic "Token Number" and "Estimated Wait Time" for confirmed appointments.

Updates must be pushed in real-time via WebSockets.

FR-08: Rescheduling & Cancellation

Patient can cancel up to X hours before appointment for a full refund.

If Doctor cancels, funds are auto-refunded to the user's "Kabiraj Wallet."

3.4 Module 4: The Telemedicine Suite (Core)

FR-09: Adaptive Video Calling (WebRTC)

System shall support HD video calling.

Lite Mode: System must automatically detect network speeds < 150Kbps and switch to "Audio + Slideshow" mode (updating patient image every 5 seconds).

FR-10: Live Voice-to-Voice Translation (Bhasha Setu)

System shall capture audio from the speaker (e.g., Hindi), transcribe it, translate it to the listener's language (e.g., Bengali), and synthesize speech output in real-time.

Latency for translation must be < 3 seconds.

FR-11: Smart Auto-Notes (AI Scribe)

System shall record (with consent) and transcribe the consultation.

AI shall extract clinical entities (Symptoms, Diagnosis, Meds) and populate the Doctor’s notes field automatically.

FR-12: Remote Hardware Control

Doctor shall have a button to request control of the Patient’s camera (Flashlight Toggle, Zoom Level). Patient must approve the request.

3.5 Module 5: Vital Scanning & Diagnostics (USP)

FR-13: PPG Vital Scan (Pre-Call)

App shall use the phone camera and flashlight to measure Heart Rate and Stress Level.

Data must be saved to the appointment record before the user enters the waiting room.

FR-14: Live Vitals Overlay

During a video call, Doctor can trigger a "Live Check."

System shall render a real-time graph of the patient's pulse over the video feed.

FR-15: Symptom Timeline

System shall visualize patient-reported symptoms over time (e.g., fever trends) as a line graph for the doctor.

3.6 Module 6: Payments & Finance

FR-16: Payment Integration

Support for UPI Intent (GPay/PhonePe), Credit/Debit Cards.

FR-17: Escrow System

Payment is deducted at booking but marked as "Held."

Funds are transferred to Doctor's ledger only upon "Consultation Completed" status.

FR-18: Sahayak Commission

If booked by an Agent, a configurable percentage/fee is automatically credited to the Agent’s wallet.

3.7 Module 7: Prescriptions & Records

FR-19: One-Tap Rx Templates

Doctors shall be able to create and save prescription templates (e.g., "Viral Fever Kit").

FR-20: Audio Rx Generation

System shall convert the finalized text prescription into an audio file in the patient's preferred language.

Audio file must be accessible via App and WhatsApp.

FR-21: Offline Health Records

App must cache the last 10 prescriptions and reports locally for offline access.