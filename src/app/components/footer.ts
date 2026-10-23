import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="py-12 border-t border-slate-900 bg-[#06080d] text-slate-400 text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <!-- Left: Identity -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              GT
            </div>
            <div>
              <span class="font-bold text-sm text-slate-100 block">
                {{ portfolioService.profile().fullName }}
              </span>
              <span class="text-[11px] text-slate-500">
                SQL Developer & Full-Stack Engineer
              </span>
            </div>
          </div>

          <!-- Middle Navigation -->
          <div class="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="#home" class="hover:text-purple-300 transition-colors">Home</a>
            <a href="#about" class="hover:text-purple-300 transition-colors">About</a>
            <a href="#skills" class="hover:text-purple-300 transition-colors">Skills</a>
            <a href="#experience" class="hover:text-purple-300 transition-colors">Experience</a>
            <a href="#projects" class="hover:text-purple-300 transition-colors">Projects</a>
            <button
              type="button"
              (click)="portfolioService.openSqlModal()"
              class="hover:text-indigo-300 transition-colors cursor-pointer"
            >
              SQL Sandbox
            </button>
            <button
              type="button"
              (click)="portfolioService.openAiStudioModal()"
              class="hover:text-purple-300 transition-colors cursor-pointer text-purple-400"
            >
              AI CV Studio
            </button>
          </div>

          <!-- Right Socials -->
          <div class="flex items-center gap-4 text-slate-400">
            <a
              [href]="portfolioService.profile().github"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
              title="GitHub"
            >
              <mat-icon class="text-base! w-5! h-5!">code</mat-icon>
            </a>
            <a
              [href]="portfolioService.profile().linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
              title="LinkedIn"
            >
              <mat-icon class="text-base! w-5! h-5!">work</mat-icon>
            </a>
            <a
              [href]="'mailto:' + portfolioService.profile().email"
              class="hover:text-white transition-colors"
              title="Email"
            >
              <mat-icon class="text-base! w-5! h-5!">mail</mat-icon>
            </a>
          </div>
        </div>

        <div class="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 {{ portfolioService.profile().fullName }}. All rights reserved.</p>
          <p class="flex items-center gap-1.5">
            <span>Built with Google AI Studio using Free AI — No Coding Required</span>
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  readonly portfolioService = inject(Portfolio);
}
