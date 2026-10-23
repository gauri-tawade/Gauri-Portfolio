import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="home" class="relative pt-12 pb-20 overflow-hidden">
      <!-- Glow ambient lights -->
      <div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <!-- Left Column: Copy & Actions -->
          <div class="lg:col-span-7 flex flex-col space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-medium w-fit">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
              <span>MCA Graduate (Completed) · 6-Mo Software Dev Internship</span>
            </div>

            <div class="space-y-2">
              <p class="text-indigo-400 font-semibold tracking-wide text-sm sm:text-base">
                Hello, I'm
              </p>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {{ portfolioService.profile().fullName.split(' ')[0] }}
                <span class="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  {{ portfolioService.profile().fullName.split(' ').slice(1).join(' ') }}
                </span>
              </h1>
              <h2 class="text-lg sm:text-xl font-medium text-slate-300">
                {{ portfolioService.profile().tagline }}
              </h2>
            </div>

            <p class="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              {{ portfolioService.profile().bio }}
            </p>

            <!-- Key ATS & Engineering Badges -->
            <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
              <span class="px-2.5 py-1 rounded-md bg-purple-900/60 border border-purple-500/40 text-purple-200 font-medium flex items-center gap-1">
                <mat-icon class="text-xs! w-3.5! h-3.5! text-purple-400">school</mat-icon>
                MCA Graduate (Completed)
              </span>
              <span class="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 flex items-center gap-1">
                <mat-icon class="text-xs! w-3.5! h-3.5! text-emerald-400">check_circle</mat-icon>
                MySQL 3NF Normalization
              </span>
              <span class="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 flex items-center gap-1">
                <mat-icon class="text-xs! w-3.5! h-3.5! text-indigo-400">storage</mat-icon>
                10+ Relational Tables
              </span>
              <span class="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 flex items-center gap-1">
                <mat-icon class="text-xs! w-3.5! h-3.5! text-amber-400">grade</mat-icon>
                8.79 BCA CGPA (Distinction)
              </span>
            </div>

            <!-- Call to Actions -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>View My Projects</span>
                <mat-icon class="text-sm! w-4! h-4! group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
              </a>

              <button
                type="button"
                (click)="portfolioService.openContactModal()"
                class="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer"
              >
                <mat-icon class="text-sm! w-4! h-4! text-purple-400">chat</mat-icon>
                <span>Contact Me</span>
              </button>

              <button
                type="button"
                (click)="portfolioService.openSqlModal()"
                class="px-4 py-3 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/40 text-indigo-200 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
                title="Open live SQL playground"
              >
                <mat-icon class="text-sm! w-4! h-4! text-indigo-400">play_arrow</mat-icon>
                <span>Run Live SQL</span>
              </button>
            </div>

            <!-- Social Links & Verification -->
            <div class="flex items-center gap-5 pt-3 text-slate-400">
              <a
                [href]="portfolioService.profile().github"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-mono"
              >
                <mat-icon class="text-sm! w-4! h-4!">code</mat-icon>
                <span>github.com/gauri-creator</span>
              </a>

              <a
                [href]="portfolioService.profile().linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-mono"
              >
                <mat-icon class="text-sm! w-4! h-4!">work</mat-icon>
                <span>linkedin.com/in/gauri-tawade</span>
              </a>

              <a
                [href]="'mailto:' + portfolioService.profile().email"
                class="hover:text-white transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-mono"
              >
                <mat-icon class="text-sm! w-4! h-4!">mail</mat-icon>
                <span>Email</span>
              </a>
            </div>
          </div>

          <!-- Right Column: Visual Portrait & Floating Tech Graphic -->
          <div class="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div class="relative w-full max-w-md flex flex-col items-center">
              <!-- Glowing backdrop orb -->
              <div class="absolute -top-6 w-64 h-64 rounded-full bg-gradient-to-tr from-purple-600/30 to-indigo-500/20 blur-2xl pointer-events-none"></div>

              <!-- Main Avatar with Glowing Indigo Ring -->
              <div class="relative z-10 w-52 h-52 sm:w-60 sm:h-60 rounded-full p-1.5 bg-gradient-to-tr from-purple-500 via-indigo-500 to-purple-400 shadow-2xl shadow-purple-900/40">
                <div class="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-[#080b11]">
                  <img
                    [src]="portfolioService.profile().avatarUrl"
                    [alt]="portfolioService.profile().fullName"
                    class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    referrerpolicy="no-referrer"
                  />
                </div>

                <!-- Floating tech badges -->
                <div class="absolute -top-2 -right-2 bg-[#0e1320] border border-purple-500/50 text-purple-300 rounded-xl p-2 shadow-lg shadow-purple-950/60 flex items-center justify-center">
                  <mat-icon class="text-base! w-5! h-5!">code</mat-icon>
                </div>
                <div class="absolute bottom-2 -left-2 bg-[#0e1320] border border-indigo-500/50 text-indigo-300 rounded-xl p-2 shadow-lg shadow-indigo-950/60 flex items-center justify-center">
                  <mat-icon class="text-base! w-5! h-5!">storage</mat-icon>
                </div>
              </div>

              <!-- Sleek Code Snippet Preview Box -->
              <div class="w-full mt-6 bg-[#0c101b]/95 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md relative z-10">
                <div class="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span class="text-[11px] font-mono text-slate-400 ml-2">bus_booking_3nf.sql</span>
                  </div>
                  <button
                    type="button"
                    (click)="portfolioService.openSqlModal()"
                    class="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Execute</span>
                    <mat-icon class="text-xs! w-3! h-3!">play_arrow</mat-icon>
                  </button>
                </div>

                <!-- Syntax Highlighted Snippet -->
                <div class="font-mono text-xs space-y-1 text-slate-300">
                  <p><span class="text-purple-400">SELECT</span> r.source, r.destination, <span class="text-indigo-300">COUNT</span>(b.booking_id) <span class="text-purple-400">AS</span> total_seats</p>
                  <p><span class="text-purple-400">FROM</span> routes r</p>
                  <p><span class="text-purple-400">INNER JOIN</span> bookings b <span class="text-purple-400">ON</span> r.route_id = b.route_id</p>
                  <p><span class="text-purple-400">WHERE</span> b.booking_status = <span class="text-emerald-400">'CONFIRMED'</span></p>
                  <p><span class="text-purple-400">GROUP BY</span> r.route_id;</p>
                </div>

                <div class="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span class="flex items-center gap-1 text-emerald-400">
                    <mat-icon class="text-xs! w-3! h-3!">bolt</mat-icon>
                    0.002s Execution Time
                  </span>
                  <span class="font-mono text-slate-500">MySQL 8.0 · 3NF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  readonly portfolioService = inject(Portfolio);
}
