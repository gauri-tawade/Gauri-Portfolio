import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="projects" class="py-16 border-t border-slate-900 bg-[#080b12] relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 uppercase tracking-widest mb-2">
              <span>Selected Work</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
            <div class="h-1 w-12 bg-purple-500 rounded-full mt-2"></div>
          </div>

          <!-- Category filter buttons -->
          <div class="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            @for (cat of filterOptions; track cat) {
              <button
                type="button"
                (click)="portfolioService.setProjectFilter(cat)"
                class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                [class.bg-purple-600]="portfolioService.projectFilter() === cat"
                [class.text-white]="portfolioService.projectFilter() === cat"
                [class.text-slate-400]="portfolioService.projectFilter() !== cat"
                [class.hover:text-slate-200]="portfolioService.projectFilter() !== cat"
              >
                {{ cat }}
              </button>
            }
          </div>
        </div>

        <!-- Project Cards Grid (Styled to match dark card mockup) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of portfolioService.filteredProjects(); track project.id) {
            <div
              class="group rounded-2xl bg-[#0c101c] border border-slate-800 hover:border-purple-500/50 hover:bg-[#101525] transition-all flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-purple-950/20"
            >
              <!-- Card Top: Visual Thumbnail Representation -->
              <div class="h-44 w-full bg-slate-900/90 relative overflow-hidden border-b border-slate-800/80 p-4 flex flex-col justify-between">
                <!-- Glowing corner accent -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-xl pointer-events-none group-hover:bg-purple-600/20 transition-all"></div>

                <div class="flex items-center justify-between z-10">
                  <span class="px-2.5 py-1 text-[11px] font-mono rounded-md bg-black/50 border border-slate-700/60 text-purple-300">
                    {{ project.category }}
                  </span>

                  @if (project.sqlSchemaPreview) {
                    <button
                      type="button"
                      (click)="portfolioService.openSqlModal()"
                      class="px-2 py-0.5 text-[10px] font-mono rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 hover:text-white cursor-pointer"
                      title="Run query on this project's database"
                    >
                      <mat-icon class="text-xs! w-3! h-3!">terminal</mat-icon>
                      SQL Schema
                    </button>
                  }
                </div>

                <!-- Abstract Visual Mockup Mocking Real App Interface -->
                <div class="rounded-lg bg-black/40 border border-slate-800 p-2.5 z-10 backdrop-blur-xs">
                  <div class="flex items-center gap-1.5 mb-2">
                    <span class="w-2 h-2 rounded-full bg-rose-500/80"></span>
                    <span class="w-2 h-2 rounded-full bg-amber-500/80"></span>
                    <span class="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                    <span class="text-[10px] font-mono text-slate-400 ml-1 truncate">
                      {{ project.subtitle || project.title }}
                    </span>
                  </div>

                  @if (project.sqlSchemaPreview) {
                    <div class="font-mono text-[10px] text-indigo-300 flex items-center justify-between">
                      <span>TABLE: {{ project.sqlSchemaPreview.table }}</span>
                      <span class="text-emerald-400">3NF Normalization</span>
                    </div>
                  } @else {
                    <div class="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Production Grade</span>
                      <span class="text-purple-400">Verified Output</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {{ project.title }}
                    </h3>
                    <a
                      [href]="project.githubUrl || portfolioService.profile().github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-slate-400 hover:text-white transition-colors"
                      title="View GitHub repository"
                    >
                      <mat-icon class="text-sm! w-4! h-4!">open_in_new</mat-icon>
                    </a>
                  </div>

                  <p class="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {{ project.description }}
                  </p>
                </div>

                <!-- Highlights preview -->
                @if (project.highlights && project.highlights.length > 0) {
                  <div class="p-2.5 rounded-lg bg-black/20 border border-slate-800/80 text-[11px] text-slate-300">
                    <p class="font-medium text-slate-200 line-clamp-1 mb-0.5">
                      Key Impact:
                    </p>
                    <p class="text-slate-400 line-clamp-2">
                      {{ project.highlights[0] }}
                    </p>
                  </div>
                }

                <!-- Technologies badges & Actions -->
                <div class="space-y-3 pt-1">
                  <div class="flex flex-wrap gap-1.5">
                    @for (tech of project.technologies; track tech) {
                      <span class="px-2 py-0.5 text-[11px] rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {{ tech }}
                      </span>
                    }
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <button
                      type="button"
                      (click)="portfolioService.openProjectModal(project)"
                      class="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Case Study</span>
                      <mat-icon class="text-xs! w-3! h-3!">arrow_forward</mat-icon>
                    </button>

                    @if (project.sqlSchemaPreview) {
                      <button
                        type="button"
                        (click)="portfolioService.openSqlModal()"
                        class="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <mat-icon class="text-xs! w-3! h-3!">terminal</mat-icon>
                        Run Query
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Projects {
  readonly portfolioService = inject(Portfolio);
  readonly filterOptions = ['All', 'Database & SQL', 'Machine Learning', 'Web Application', 'E-Commerce'];
}
