import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <SideNav />
      <main id="main-content" className="mx-auto max-w-5xl px-6">
        {children}
      </main>
    </>
  );
}
