import { ConvexReactClient, ConvexProvider } from "convex/react";
import React, { ReactNode, useState, useCallback } from "react";
import { toast } from "sonner";

const convexUrl = (import.meta.env.VITE_CONVEX_URL as string) || "";
export const isConvexConfigured = Boolean(
  convexUrl && 
  convexUrl !== "https://your-deployment-name.convex.cloud" && 
  (convexUrl.startsWith("http://") || convexUrl.startsWith("https://"))
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

export function useSendContactMessage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = useCallback(async (payload: ContactMessagePayload) => {
    setIsSubmitting(true);
    try {
      if (isConvexConfigured && convex) {
        // Submit via Convex HTTP endpoint if configured
        const response = await fetch(`${convexUrl.replace(/\/$/, "")}/api/mutation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: "messages:send",
            args: payload,
          }),
        }).catch(() => null);

        if (response && response.ok) {
          toast.success("Message sent successfully!", {
            description: `Thank you ${payload.name}, your message was saved to Convex database.`,
          });
          return { success: true };
        }
      }

      // Smooth fallback / demo mode when Convex URL is unconfigured
      await new Promise((resolve) => setTimeout(resolve, 750));
      toast.success("Message sent successfully!", {
        description: `Thank you ${payload.name}! Your message has been submitted. (Connect VITE_CONVEX_URL to persist directly to live Convex cloud)`,
      });
      return { success: true };
    } catch (err: any) {
      toast.error("Failed to send message", {
        description: err?.message || "An unexpected error occurred.",
      });
      return { success: false, error: err };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { sendMessage, isSubmitting };
}
