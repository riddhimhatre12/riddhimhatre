import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { ConvexAppProvider } from "@/lib/convex";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Riddhi Mhatre | Riddhimhatre Official Portfolio — Data Analyst & IT Graduate" },
      {
        name: "description",
        content:
          "Official Portfolio of Riddhi Mhatre (riddhimhatre) — B.Sc. in Information Technology graduate from Mumbai University. Specializing in Data Analytics, SQL, Web Development, Java, and Power BI.",
      },
      {
        name: "keywords",
        content:
          "Riddhi Mhatre, riddhimhatre, Riddhi Mhatre portfolio, riddhimhatre portfolio, Riddhi Mhatre Data Analyst, Riddhi Mhatre B.Sc IT, Riddhi Mhatre Mumbai, Riddhi Mhatre IT Graduate, Riddhi Mhatre Web Developer, Riddhi Mhatre SQL, Riddhi Mhatre BizTech",
      },
      { name: "author", content: "Riddhi Mhatre" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "googlebot", content: "index, follow" },

      { property: "og:title", content: "Riddhi Mhatre | Riddhimhatre Portfolio" },
      {
        property: "og:description",
        content:
          "Explore Riddhi Mhatre's portfolio — Data Analytics, SQL, Web Development projects, and IT certifications.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:site_name", content: "Riddhi Mhatre Portfolio" },
      { property: "profile:first_name", content: "Riddhi" },
      { property: "profile:last_name", content: "Mhatre" },
      { property: "profile:username", content: "riddhimhatre" },
      { property: "og:image", content: "/biztech_certificate.png" },

      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      { httpEquiv: "X-Frame-Options", content: "DENY" },
      {
        httpEquiv: "Content-Security-Policy",
        content:
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https: wss:;",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Riddhi Mhatre | Riddhimhatre Portfolio" },
      {
        name: "twitter:description",
        content:
          "Explore Riddhi Mhatre's portfolio — Data Analytics, SQL, Web Development projects, and IT certifications.",
      },
      { name: "twitter:image", content: "/biztech_certificate.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "canonical", href: "https://riddhimhatre.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Great+Vibes&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Riddhi Mhatre",
    alternateName: ["riddhimhatre", "Riddhi Girish Mhatre", "Riddhi Mhatre Portfolio"],
    url: "https://riddhimhatre.com",
    image: "https://riddhimhatre.com/biztech_certificate.png",
    jobTitle: "Data Analyst & Information Technology Graduate",
    worksFor: {
      "@type": "Organization",
      name: "BizTech IT Solutions",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Mumbai",
    },
    knowsAbout: [
      "Data Analytics",
      "SQL",
      "Web Development",
      "Java",
      "Manual Testing",
      "Power BI",
      "Information Technology",
    ],
    sameAs: [
      "https://github.com/riddhimhatre12",
      "https://www.linkedin.com/in/riddhi-mhatre-909529342/",
      "https://www.instagram.com/riddhi_mhatre12",
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <ConvexAppProvider>
      <QueryClientProvider client={queryClient}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <Toaster position="bottom-right" richColors />
      </QueryClientProvider>
    </ConvexAppProvider>
  );
}
