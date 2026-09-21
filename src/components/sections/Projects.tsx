"use client";

import { ProjectArticle } from "@/components/projects/ProjectArticle";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Project, projects } from "@/content/projects";
import { LayoutGroup } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";

const PROJECT_QUERY_PARAMETER = "project";

function writeProjectParam(slug: string | null) {
  const url = new URL(window.location.href);

  if (slug) {
    url.searchParams.set(PROJECT_QUERY_PARAMETER, slug);
  } else {
    url.searchParams.delete(PROJECT_QUERY_PARAMETER);
  }

  window.history.replaceState(window.history.state, "", url);
}

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const handleOpen = useCallback((project: Project) => {
    setOpenProject(project);
    writeProjectParam(project.slug);
  }, []);

  const handleClose = useCallback(() => {
    setOpenProject(null);
    writeProjectParam(null);
  }, []);

  useEffect(() => {
    const projectSlug = new URLSearchParams(window.location.search).get(
      PROJECT_QUERY_PARAMETER,
    );
    if (!projectSlug) return;

    const matchingProject = projects.find(
      (project) => project.slug === projectSlug,
    );
    if (!matchingProject) return;

    document.getElementById("projects")?.scrollIntoView({ block: "start" });
    // Defer opening until the shared-layout card has mounted.
    const animationFrameId = window.requestAnimationFrame(() =>
      setOpenProject(matchingProject),
    );

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  const firstProject = projects[0];
  const lastProject = projects[projects.length - 1];
  const middleProjects = projects.slice(1, -1);

  return (
    <LayoutGroup id="project-articles">
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="relative scroll-mt-24 bg-paper py-24 sm:py-28 lg:py-32"
      >
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="projects-heading"
              title="Products I’ve shipped."
              description="Apps, websites, and models with I've built from zero to production, with hundreds of thousands of users. Click on any card to read the full story."
            />
            <Reveal delay={0.3} from="left" className="md:pb-2">
              <a
                href="https://github.com/Archit404Error"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
              >
                <GithubIcon className="size-4 transition-transform duration-500 group-hover:rotate-[360deg]" />
                More on GitHub
              </a>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
            <ProjectCard
              project={firstProject}
              featured
              active={openProject?.slug === firstProject.slug}
              onOpen={handleOpen}
            />
            {middleProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                active={openProject?.slug === project.slug}
                onOpen={handleOpen}
              />
            ))}
            <ProjectCard
              project={lastProject}
              featured
              reverse
              active={openProject?.slug === lastProject.slug}
              onOpen={handleOpen}
            />
          </ul>
        </div>

        <ProjectArticle project={openProject} onClose={handleClose} />
      </section>
    </LayoutGroup>
  );
}
