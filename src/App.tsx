import { Layout } from "./components/Layout";
import { Hero } from "./sections/Hero";
import { Skills } from "./sections/Skills";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";

export default function App() {
  return (
    <Layout>
      <Hero />
      <Skills />
      <ExperienceSection />
      <ProjectsSection />
    </Layout>
  );
}
