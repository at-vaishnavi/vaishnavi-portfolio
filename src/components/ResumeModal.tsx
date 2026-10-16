
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAILJS_SERVICE_ID = "service_pfoa3od";
const EMAILJS_TEMPLATE_ID = "template_7fagk5a";
const EMAILJS_PUBLIC_KEY = "YhY93F08kOdjlxCTtK1VDT";

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              visitor_email: email.trim(),
              request_time: new Date().toLocaleString(),
            },
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("EmailJS response:", response.status, errorDetails);
        throw new Error(errorDetails || "Email notification could not be sent.")
      }

      // Start the resume download after EmailJS accepts the request.
      const link = document.createElement("a");
      link.href = "/VAISHNAVI.pdf";
      link.download = "Vaishnavi_V_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Resume downloading!",
        description:
          "Your request was submitted successfully. The download should start shortly.",
      });

      setEmail("");
      onClose();
    } catch (error) {
      console.error("Resume notification error:", error);

      toast({
        title: "Unable to process your request",
        description:
          "The notification could not be sent. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="glass-panel p-8 mx-4">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close resume dialog"
                className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Download className="h-8 w-8 text-primary" />
                </div>

                <h3 className="text-2xl font-semibold mb-2">
                  Download Resume
                </h3>

                <p className="text-muted-foreground">
                  Enter your email to download my resume and stay connected.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

                  <Input
                    type="email"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-11 input-focus bg-background/50 border-border/50"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Download Resume
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Your email will only be used to track recruiter interest.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
