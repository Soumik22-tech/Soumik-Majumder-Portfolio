import { useState } from "react";
import "./styles/CallToAction.css";

// ==========================================
// PASTE YOUR GOOGLE SCRIPT URL BELOW
// ==========================================
const GOOGLE_SCRIPT_URL: string = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

const CallToAction = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (GOOGLE_SCRIPT_URL === "https://script.google.com/macros/s/AKfycbxsCcp-QX3kiHcV4gmUf3k6uvhoek81I8OH_4musQ22NHwMR_Wbk0djaZ856qGhyWpz/exec") {
      alert("Please add your Google Script URL in CallToAction.tsx first!");
      return;
    }

    setIsSubmitting(true);

    // Prepare data to send as x-www-form-urlencoded
    const formDataParams = new URLSearchParams();
    formDataParams.append("name", formData.name);
    formDataParams.append("email", formData.email);
    formDataParams.append("message", formData.message);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // no-cors gets around Google's strict CORS rules
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataParams,
      });

      alert("Awesome! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Oops! Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cta-section" id="contact-form">
      <div className="contact-form-container">
        <h2 className="form-title">Let's Work Together</h2>
        <p className="form-subtitle">Have a project in mind? Drop me a message.</p>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              data-cursor="disable"
              disabled={isSubmitting}
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              data-cursor="disable"
              disabled={isSubmitting}
            />
          </div>
          <div className="input-group">
            <textarea 
              placeholder="Tell me about your project..." 
              rows={4} 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              data-cursor="disable"
              disabled={isSubmitting}
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="cta-btn cta-btn-submit" 
            data-cursor="disable"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
          >
            {isSubmitting ? "Sending..." : "Send Message ?"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CallToAction;
