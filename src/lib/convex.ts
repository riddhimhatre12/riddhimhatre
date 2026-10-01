import { ConvexReactClient, ConvexProvider } from "convex/react";
import React, { ReactNode, useState, useCallback } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";

const convexUrl = (import.meta.env.VITE_CONVEX_URL as string) || "";
export const isConvexConfigured = Boolean(
  convexUrl &&
  convexUrl !== "https://your-deployment-name.convex.cloud" &&
  (convexUrl.startsWith("http://") || convexUrl.startsWith("https://")),
);

export const convex = isConvexConfigured ? new ConvexReactClient(convexUrl) : null;

export function ConvexAppProvider({ children }: { children: ReactNode }) {
  if (convex && isConvexConfigured) {
    return React.createElement(ConvexProvider, { client: convex }, children);
  }
  return React.createElement(React.Fragment, null, children);
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function createWhatsAppUrl(payload: ContactMessagePayload, targetPhone = "919766379529") {
  const cleanPhone = targetPhone.replace(/[^0-9]/g, "");
  const text =
    `*New Portfolio Contact Inquiry*\n\n` +
    `👤 *Name:* ${payload.name}\n` +
    `✉️ *Email:* ${payload.email}\n` +
    `📞 *Phone:* ${payload.phone || "N/A"}\n\n` +
    `💬 *Message:*\n${payload.message}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function useSendContactMessage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = useCallback(async (payload: ContactMessagePayload, sendToWhatsApp = true) => {
    setIsSubmitting(true);
    try {
      if (isConvexConfigured && convex) {
        await convex.mutation(api.messages.send, payload);
        // Trigger background SMS/WhatsApp server notification if Twilio is configured
        convex.action(api.messages.sendSmsNotification, payload).catch(() => null);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const waUrl = createWhatsAppUrl(payload);
      if (sendToWhatsApp && typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }

      toast.success("Message Sent & Saved!", {
        description: sendToWhatsApp
          ? `Thank you ${payload.name}! Saved to database & WhatsApp message opened.`
          : `Thank you ${payload.name}! Your message was saved successfully.`,
      });
      return { success: true, waUrl };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error("Failed to send message", {
        description: errorMessage,
      });
      return { success: false, error: err };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { sendMessage, isSubmitting };
}
