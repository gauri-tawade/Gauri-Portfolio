import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="experience" class="py-16 border-t border-slate-900 bg-[#070a10]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 uppercase tracking-widest mb-2">
              <span>Career Journey</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Experience & Education
            </h2>
            <div class="h-1 w-12 bg-purple-500 rounded-full mt-2"></div>
          </div>
          <p class="text-sm text-slate-400 max-w-md">
            Hands-on 6-month software engineering internship backed by academic distinction in Computer Applications.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left: Internship Timeline -->
          <div class="lg:col-span-7 space-y-6">
            <h3 class="text-lg font-bold text-slate-200 flex items-center gap-2">
              <mat-icon class="text-purple-400">work</mat-icon>
              <span>Work & Internship Experience</span>
            </h3>

            @for (exp of portfolioService.profile().experiences; track exp.id) {
              <div class="p-6 rounded-2xl bg-[#0d121e] border border-slate-800 hover:border-purple-500/30 transition-all space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div>
                    <h4 class="text-lg font-bold text-white">{{ exp.title }}</h4>
                    <p class="text-sm text-purple-300 font-medium">{{ exp.company }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 text-xs font-mono rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/20">
                      {{ exp.period }}
                    </span>
                  </div>
                </div>

                <p class="text-sm text-slate-300 leading-relaxed">
                  {{ exp.description }}
                </p>

                <!-- Key Achievements -->
                <div class="space-y-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Key Deliverables:</span>
                  <ul class="space-y-1.5 text-xs text-slate-300">
                    @for (hl of exp.highlights; track hl) {
                      <li class="flex items-start gap-2">
                        <mat-icon class="text-emerald-400 text-xs! w-4! h-4! shrink-0 mt-0.5">check_circle</mat-icon>
                        <span>{{ hl }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Database Metrics Card if available -->
                @if (exp.schemaDetails) {
                  <div class="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/20 grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
                    <div class="p-2 rounded bg-black/30">
                      <span class="block font-bold text-white">{{ exp.schemaDetails.tablesCount }} Tables</span>
                      <span class="text-[10px] text-slate-400">MySQL Relational</span>
                    </div>
                    <div class="p-2 rounded bg-black/30">
                      <span class="block font-bold text-white">{{ exp.schemaDetails.seededRecords }}+ Records</span>
                      <span class="text-[10px] text-slate-400">Tested & Validated</span>
                    </div>
                    <div class="p-2 rounded bg-black/30 col-span-2 sm:col-span-1">
                      <span class="block font-bold text-purple-300">3NF Normalization</span>
                      <span class="text-[10px] text-slate-400">Referential Integrity</span>
                    </div>
                  </div>
                }

                <!-- Technologies -->
                <div class="flex flex-wrap gap-1.5 pt-2">
                  @for (t of exp.technologies; track t) {
                    <span class="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700/50">
                      {{ t }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Right: Education Timeline & Strengths -->
          <div class="lg:col-span-5 space-y-6">
            <h3 class="text-lg font-bold text-slate-200 flex items-center gap-2">
              <mat-icon class="text-indigo-400">school</mat-icon>
              <span>Academic Degrees</span>
            </h3>

            <div class="space-y-4">
              @for (edu of portfolioService.profile().education; track edu.degree) {
                <div class="p-5 rounded-2xl bg-[#0d121e] border border-slate-800 hover:border-indigo-500/30 transition-all space-y-2">
                  <div class="flex items-start justify-between gap-2">
                    <h4 class="text-sm sm:text-base font-bold text-white">{{ edu.degree }}</h4>
                    <span class="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800 text-indigo-300 border border-indigo-500/20 shrink-0">
                      {{ edu.year }}
                    </span>
                  </div>
                  <p class="text-xs text-purple-300 font-medium">{{ edu.institution }}</p>
                  @if (edu.grade) {
                    <p class="text-xs text-amber-300 font-semibold flex items-center gap-1">
                      <mat-icon class="text-xs! w-3.5! h-3.5!">grade</mat-icon>
                      {{ edu.grade }}
                    </p>
                  }
                  <p class="text-xs text-slate-400 leading-relaxed">
                    {{ edu.details }}
                  </p>

                  @if (edu.coursework && edu.coursework.length > 0) {
                    <div class="pt-2 flex flex-wrap gap-1">
                      @for (c of edu.coursework; track c) {
                        <span class="px-1.5 py-0.5 text-[10px] rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {{ c }}
                        </span>
                      }
                    </div>
                  }
                </div>
              }
            </div>

            <!-- Professional Strengths -->
            <div class="p-5 rounded-2xl bg-gradient-to-br from-[#0e1422] to-[#12192c] border border-slate-800 space-y-3">
              <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <mat-icon class="text-xs! w-4! h-4! text-purple-400">stars</mat-icon>
                Key Engineering Strengths
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                @for (s of portfolioService.profile().strengths; track s) {
                  <div class="flex items-center gap-2 text-xs text-slate-300 p-1.5 rounded bg-black/20">
                    <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    <span class="line-clamp-1">{{ s }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Experience {
  readonly portfolioService = inject(Portfolio);
}
