import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Login
      "login.title": "AVMS Login",
      "login.username": "Username",
      "login.password": "Password",
      "login.role": "Role",
      "login.resident": "Resident",
      "login.security": "Security",
      "login.button": "Login",
      "login.welcome": "Welcome to Apartment Visitor Management System",
      
      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.addVisitor": "Add Visitor",
      "nav.visitorHistory": "Visitor History",
      "nav.frequentVisitors": "Frequent Visitors",
      "nav.emergency": "Emergency",
      "nav.logout": "Logout",
      
      // Dashboard
      "dashboard.welcome": "Welcome back",
      "dashboard.quickStats": "Quick Stats",
      "dashboard.todayVisitors": "Today's Visitors",
      "dashboard.pendingApprovals": "Pending Approvals",
      "dashboard.recentActivity": "Recent Activity",
      
      // Add Visitor
      "visitor.add": "Add New Visitor",
      "visitor.name": "Visitor Name",
      "visitor.phone": "Phone Number",
      "visitor.purpose": "Purpose of Visit",
      "visitor.date": "Visit Date",
      "visitor.time": "Visit Time",
      "visitor.photo": "Upload Photo",
      "visitor.submit": "Generate Pass",
      "visitor.success": "Visitor pass generated successfully!",
      
      // Visitor History
      "history.title": "Visitor History",
      "history.filter": "Filter by",
      "history.status.all": "All Status",
      "history.status.pending": "Pending",
      "history.status.arrived": "Arrived",
      "history.status.denied": "Denied",
      "history.status.expired": "Expired",
      
      // Emergency
      "emergency.title": "Emergency Alert",
      "emergency.description": "This will immediately notify security personnel",
      "emergency.confirm": "Send Alert",
      "emergency.cancel": "Cancel",
      "emergency.sent": "Emergency alert sent successfully!",
      
      // Security Panel
      "security.title": "Security Panel",
      "security.scanQR": "Scan QR Code",
      "security.enterOTP": "Enter OTP",
      "security.verifyVisitor": "Verify Visitor",
      "security.allowEntry": "Allow Entry",
      "security.denyEntry": "Deny Entry",
      "security.visitorQueue": "Visitor Queue",
      
      // Language
      "language.switch": "Switch Language",
      "language.current": "Current Language",
      
      // Common
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.edit": "Edit",
      "common.delete": "Delete",
      "common.search": "Search",
      "common.filter": "Filter",
      "common.export": "Export",
      "common.loading": "Loading...",
      "common.error": "Something went wrong",
      "common.success": "Success!"
    }
  },
  ta: {
    translation: {
      // Login
      "login.title": "AVMS உள்நுழைவு",
      "login.username": "பயனர் பெயர்",
      "login.password": "கடவுச்சொல்",
      "login.role": "பதவி",
      "login.resident": "குடியிருப்பாளர்",
      "login.security": "பாதுகாப்பு",
      "login.button": "உள்நுழை",
      "login.welcome": "அபார்ட்மென்ட் விசிட்டர் மேனேஜ்மென்ட் சிஸ்டத்திற்கு வரவேற்கிறோம்",
      
      // Navigation
      "nav.dashboard": "டாஷ்போர்டு",
      "nav.addVisitor": "பார்வையாளர் சேர்க்க",
      "nav.visitorHistory": "பார்வையாளர் வரலாறு",
      "nav.frequentVisitors": "அடிக்கடி வருபவர்கள்",
      "nav.emergency": "அவசரநிலை",
      "nav.logout": "வெளியேறு",
      
      // Dashboard
      "dashboard.welcome": "மீண்டும் வரவேற்கிறோம்",
      "dashboard.quickStats": "விரைவு புள்ளிவிவரங்கள்",
      "dashboard.todayVisitors": "இன்றைய பார்வையாளர்கள்",
      "dashboard.pendingApprovals": "நிலுவையில் உள்ள ஒப்புதல்கள்",
      "dashboard.recentActivity": "சமீபத்திய செயல்பாடு",
      
      // Add Visitor
      "visitor.add": "புதிய பார்வையாளர் சேர்க்கவும்",
      "visitor.name": "பார்வையாளர் பெயர்",
      "visitor.phone": "தொலைபேசி எண்",
      "visitor.purpose": "வருகையின் நோக்கம்",
      "visitor.date": "வருகை தேதி",
      "visitor.time": "வருகை நேரம்",
      "visitor.photo": "புகைப்படம் பதிவேற்றவும்",
      "visitor.submit": "பாஸ் உருவாக்கவும்",
      "visitor.success": "பார்வையாளர் பாஸ் வெற்றிகரமாக உருவாக்கப்பட்டது!",
      
      // Visitor History
      "history.title": "பார்வையாளர் வரலாறு",
      "history.filter": "வடிகட்ட",
      "history.status.all": "அனைத்து நிலை",
      "history.status.pending": "நிலுவையில்",
      "history.status.arrived": "வந்துவிட்டார்",
      "history.status.denied": "நிராகரிக்கப்பட்டது",
      "history.status.expired": "காலாவதியானது",
      
      // Emergency
      "emergency.title": "அவசர எச்சரிக்கை",
      "emergency.description": "இது உடனடியாக பாதுகாப்பு பணியாளர்களுக்கு தெரிவிக்கும்",
      "emergency.confirm": "எச்சரிக்கை அனுப்பவும்",
      "emergency.cancel": "ரத்து செய்",
      "emergency.sent": "அவசர எச்சரிக்கை வெற்றிகரமாக அனுப்பப்பட்டது!",
      
      // Security Panel
      "security.title": "பாதுகாப்பு பேனல்",
      "security.scanQR": "QR குறியீட்டை ஸ்கேன் செய்யவும்",
      "security.enterOTP": "OTP உள்ளிடவும்",
      "security.verifyVisitor": "பார்வையாளரை சரிபார்க்கவும்",
      "security.allowEntry": "நுழைவு அனுமதி",
      "security.denyEntry": "நுழைவு மறுப்பு",
      "security.visitorQueue": "பார்வையாளர் வரிசை",
      
      // Language
      "language.switch": "மொழி மாற்று",
      "language.current": "தற்போதைய மொழி",
      
      // Common
      "common.save": "சேமி",
      "common.cancel": "ரத்து செய்",
      "common.edit": "திருத்து",
      "common.delete": "நீக்கு",
      "common.search": "தேடு",
      "common.filter": "வடிகட்டு",
      "common.export": "ஏற்றுமதி",
      "common.loading": "லோடிங்...",
      "common.error": "ஏதோ தவறு நடந்தது",
      "common.success": "வெற்றி!"
    }
  }
};

// Get saved language preference or default to Tamil
const savedLanguage = localStorage.getItem('avms_language') || 'ta';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;