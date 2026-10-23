import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <header class="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#080b11]/85 border-b border-slate-800/80 transition-all">
      <!-- Announcement / Feature Banner -->
      <div class="bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-purple-950/60 border-b border-purple-500/20 px-4 py-1.5 text-xs text-center text-slate-300 flex items-center justify-center gap-2">
        <span class="inline-flex items-center gap-1 text-purple-300 font-medium">
          <mat-icon class="text-sm! w-4! h-4! text-purple-400">auto_awesome</mat-icon>
          AI Resume-to-Portfolio Studio:
        </span>
        <span class="text-slate-300 hidden sm:inline">Turn any Resume or CV into a high-impact portfolio with Free AI — No Coding Required!</span>
        <button
          type="button"
          (click)="portfolioService.openAiStudioModal()"
          class="underline font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer ml-1 inline-flex items-center gap-0.5"
        >
          <span>Try CV Transformer</span>
          <mat-icon class="text-xs! w-3! h-3!">arrow_forward</mat-icon>
        </button>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Brand / Identity -->
        <a href="#home" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base tracking-wider shadow-md shadow-purple-900/30 group-hover:scale-105 transition-transform">
            GT
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
              {{ portfolioService.profile().fullName }}
            </span>
            <span class="text-[11px] text-slate-400 flex items-center gap-1.5 font-normal">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for Hire · SQL & Web
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-1 lg:gap-2">
          <a href="#about" class="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
            About
          </a>
          <a href="#skills" class="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
            Skills
          </a>
          <a href="#experience" class="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
            Experience
          </a>
          <a href="#projects" class="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
            Projects
          </a>
          <button
            type="button"
            (click)="portfolioService.openSqlModal()"
            class="px-3 py-1.5 text-sm text-indigo-300 hover:text-white hover:bg-indigo-950/40 rounded-lg transition-colors flex items-center gap-1.5 border border-indigo-500/30 cursor-pointer"
          >
            <mat-icon class="text-sm! w-4! h-4! text-indigo-400">terminal</mat-icon>
            SQL Sandbox
          </button>
          <a href="#contact" class="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
            Contact
          </a>
        </nav>

        <!-- Right Quick Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Recruiter Copilot button -->
          <button
            type="button"
            (click)="portfolioService.toggleCopilot()"
            class="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 rounded-xl border border-slate-700/60 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Ask AI questions about Gauri's background or generate a company pitch"
          >
            <mat-icon class="text-sm! w-4! h-4! text-purple-400">psychology</mat-icon>
            <span class="hidden lg:inline">Recruiter Copilot</span>
          </button>

          <!-- Download / View CV Button -->
          <button
            type="button"
            (click)="portfolioService.openResumeModal()"
            class="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-sm hover:shadow-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
          >
            <mat-icon class="text-sm! w-4! h-4!">description</mat-icon>
            <span>Resume (PDF)</span>
          </button>
        </div>
      </div>
    </header>
  `,
})
export class Navbar {
  readonly portfolioService = inject(Portfolio);
}
