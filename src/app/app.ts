import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { AboutAndSkills } from './components/about-and-skills';
import { Experience } from './components/experience';
import { Projects } from './components/projects';
import { Contact } from './components/contact';
import { Footer } from './components/footer';
import { SqlSandboxModal } from './components/sql-sandbox-modal';
import { ResumeViewerModal } from './components/resume-viewer-modal';
import { AiStudioModal } from './components/ai-studio-modal';
import { ProjectModal } from './components/project-modal';
import { RecruiterCopilot } from './components/recruiter-copilot';
import { Portfolio } from './services/portfolio.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    Navbar,
    Hero,
    AboutAndSkills,
    Experience,
    Projects,
    Contact,
    Footer,
    SqlSandboxModal,
    ResumeViewerModal,
    AiStudioModal,
    ProjectModal,
    RecruiterCopilot,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly portfolioService = inject(Portfolio);
}
