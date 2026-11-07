// App Configuration & Defaults
export const CONFIG = {
  herName: '', // dynamically set by user at welcome screen
  senderName: 'JM', // hardcoded as requested
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  }
};
