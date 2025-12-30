# 🎉 EventSphere – Event Management SaaS (Frontend)

EventSphere is a **modern, SaaS-style event management platform** designed to help users **discover, register, and manage events**, while enabling organizers to **create events and track engagement** through a clean, intuitive dashboard.

This project focuses on **frontend architecture, UI/UX excellence, and real-world SaaS patterns**, making it ideal for **frontend developer internships and entry-level jobs**.

---

## 🧠 Project Overview

EventSphere simulates a **real-world production SaaS application**, featuring:

- Event discovery with search & filters  
- Organizer dashboards  
- Authentication flows  
- Responsive, modern UI  
- India-localized content (**₹ pricing, Indian cities, IST dates**)  

The project is **frontend-focused**, built to demonstrate **React component design, Tailwind CSS styling, and scalable UI architecture**.

---

## ✨ Key Features

### 👥 User Features
- Browse upcoming events  
- Search & filter events by category, location, and date  
- View detailed event pages  
- Register for events (UI flow)  
- Email/password authentication  
- User profile management  

### 🧑‍💼 Organizer Features
- Organizer dashboard  
- Create & publish events  
- View event statistics (mock data)  
- Manage listed events  

### 🎨 UI / UX Features
- SaaS-style dashboard layout  
- Clean and modern design  
- Fully responsive (desktop & mobile)  
- Smooth hover effects & transitions  
- Reusable UI components  
- Premium branding & custom logo  

---

## 🏗️ Tech Stack

| Category | Technology |
|--------|------------|
| Framework | React (Vite) |
| Styling | Tailwind CSS |
| Routing | React Router |
| State Management | React Context API |
| Authentication (UI) | Email / Password |
| Icons | Lucide / React Icons |
| Animations | CSS / Tailwind |
| Data | Mock JSON |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```bash
src/
 ├── components/
 │    ├── auth/
 │    │    ├── LoginForm.jsx
 │    │    ├── SignupForm.jsx
 │    │
 │    ├── layout/
 │    │    ├── Navbar.jsx
 │    │    ├── Footer.jsx
 │    │
 │    ├── ui/
 │    │    ├── Button.jsx
 │    │    ├── Input.jsx
 │    │    ├── Modal.jsx
 │    │
 │    ├── EventCard.jsx
 │    ├── Filters.jsx
 │
 ├── pages/
 │    ├── Home.jsx
 │    ├── BrowseEvents.jsx
 │    ├── EventDetails.jsx
 │    ├── Dashboard.jsx
 │    ├── CreateEvent.jsx
 │    ├── Login.jsx
 │    ├── Signup.jsx
 │    ├── Profile.jsx
 │
 ├── context/
 │    └── AuthContext.jsx
 │
 ├── data/
 │    └── events.js
 │
 ├── App.jsx
 └── main.jsx
```

## 🌍 Localization (India-Focused)

- Currency: **₹ INR**
- Locations: Indian cities (Mumbai, Pune, Bengaluru, etc.)
- Date & Time: **IST (Indian Standard Time)**
- Event types: College fests, tech meetups, workshops, cultural events

---

## 🖥️ Screens Included

- Home Page (Hero + Featured Events)
- Browse Events Page
- Event Details Page
- Organizer Dashboard
- Create Event Page
- Login & Signup Pages
- User Profile Page

---

## 🔐 Authentication (Frontend)

- Email & password authentication flow
- Signup with first name, last name & optional profile image
- Login / Logout handling
- Protected routes for:
  - Dashboard
  - Create Event
  - My Events
- Authentication state managed using **React Context API**

> 🔹 Google login was intentionally removed to keep the project simple, stable, and frontend-focused.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/pavan050505/eventsphere-frontend.git
```

### 2️⃣ Navigate to the project folder
```bash
cd eventsphere-frontend
```

### 3️⃣ Install dependencies
```bash
npm install
```

### 4️⃣ Run the project
```bash
npm run dev
The application will run at:
http://localhost:5173
```
## 📈 Future Enhancements

- Backend integration (Node.js / Firebase)
- Real authentication & database
- Payment gateway (UPI / Cards)
- Event booking confirmation emails
- Admin panel
- Multi-language support
- Dark mode

---

## 💼 Resume Description

> **EventSphere** – A SaaS-style event management platform built using React and Tailwind CSS, featuring event discovery, organizer dashboards, authentication flows, responsive UI, and India-localized content.

---

## 🧑‍💻 Author

**Pavan Bhosle**  
Frontend Developer | AI & Data Science  

- GitHub: https://github.com/pavan050505
