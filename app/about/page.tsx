import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-lg">
      <div className="lg:max-w-1/2 max-w-full">
        <h1 className="text-2xl font-bold text-center">Swagger/OpenAPI UI</h1>
        <p className="mb-2.5 text-center">
          <strong>
            This app was made for RS School as React Course Final Team Project
          </strong>
        </p>
        <div>
          Swagger Workspace is a web application for working with OpenAPI
          (Swagger) specifications. It allows users to create, edit, validate,
          and explore API schemas in both YAML and JSON formats. The application
          automatically parses OpenAPI documents, displays available endpoints,
          lets users execute requests directly from the interface, generates
          cURL commands, and provides formatted server responses.
        </div>
      </div>
      <div className="lg:max-w-1/2  max-w-full">
        <h2 className="text-xl font-bold text-center">Technology Stack</h2>
        <div>
          <strong>Framework</strong> Next.js 16 (App Router) React 19 TypeScript
        </div>
        <div>
          <strong>Styling</strong> Tailwind CSS v4 shadcn/ui Lucide React icons
        </div>
        <div>
          <strong>API & Data</strong> OpenAPI 3.0 Swagger Parser js-yaml Fetch
          API Next.js Route Handlers
        </div>
        <div>
          <strong>Backend & Authentication</strong> Supabase Supabase
          Authentication Supabase Database
        </div>
        <div>
          <strong>State & Utilities</strong> React Hooks TanStack React Query
          Zustand (prepared for state management) next-themes
        </div>
        <div>
          <strong>Development Tools</strong> ESLint Prettier Husky lint-staged
          Vitest
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">Our Team</h2>
        <p>
          Team lead: Tema Temov
          <Link href="https://github.com/dzzuze">GitHub</Link>
        </p>
        <p>
          Nataliya Krylova
          <Link href="https://github.com/NataliItaly">GitHub</Link>
        </p>
        <p>
          Savely Kosevich
          <Link href="https://github.com/Save1i">GitHub</Link>
        </p>
      </div>
      <div>
        <p>
          <Link href="https://rs.school/">RS School</Link>
        </p>
        <p>
          <Link href="https://rs.school/courses/reactjs">React Course</Link>
        </p>
        <p>
          <Link href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md">
            Task link
          </Link>
        </p>
      </div>
    </div>
  );
}
/**
 * <Link href="https://www.wikipedia.org">
  <a target="_blank" rel="noopener noreferrer">
    Open Wikipedia in a new tab
  </a>
</Link>
 */
