import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-project-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (portfolioService.selectedProject(); as project) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <div class="w-full max-w-3xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
          <!-- Modal Header -->
          <div class="px-5 py-4 border-b border-slate-800 bg-[#0e1424] flex items-center justify-between">
            <div>
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                {{ project.category }}
              </span>
              <h3 class="text-xl font-bold text-white mt-1">{{ project.title }}</h3>
            </div>
            <button
              type="button"
              (click)="portfolioService.closeProjectModal()"
              class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <mat-icon class="text-lg! w-5! h-5!">close</mat-icon>
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
            <div>
              <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Overview:</h4>
              <p class="text-slate-300 leading-relaxed">{{ project.description }}</p>
            </div>

            <!-- Key Architectural Highlights -->
            <div>
              <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Engineering Accomplishments:</h4>
              <ul class="space-y-2">
                @for (hl of project.highlights; track hl) {
                  <li class="flex items-start gap-2 text-slate-300">
                    <mat-icon class="text-emerald-400 text-xs! w-4! h-4! shrink-0 mt-0.5">check_circle</mat-icon>
                    <span>{{ hl }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- SQL Schema / Table Preview if present -->
            @if (project.sqlSchemaPreview; as schema) {
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-semibold text-indigo-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <mat-icon class="text-xs! w-4! h-4! text-indigo-400">table_view</mat-icon>
                    Table Schema: {{ schema.table }}
                  </h4>
                  <button
                    type="button"
                    (click)="portfolioService.closeProjectModal(); portfolioService.openSqlModal()"
                    class="text-xs text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                  >
                    <span>Open in SQL Sandbox</span>
                    <mat-icon class="text-xs! w-3! h-3!">terminal</mat-icon>
                  </button>
                </div>

                <div class="rounded-xl border border-slate-800 overflow-x-auto bg-[#07090f]">
                  <table class="w-full text-left text-xs font-mono">
                    <thead class="bg-slate-900/90 text-purple-300 border-b border-slate-800">
                      <tr>
                        @for (col of schema.columns; track col) {
                          <th class="px-3 py-2 font-medium">{{ col }}</th>
                        }
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/60 text-slate-300">
                      @for (row of schema.sampleRows; track $index) {
                        <tr class="hover:bg-slate-800/40">
                          @for (col of schema.columns; track col) {
                            <td class="px-3 py-1.5 whitespace-nowrap">{{ row[col] }}</td>
                          }
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }

            <!-- Tech Stack -->
            <div>
              <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technologies Used:</h4>
              <div class="flex flex-wrap gap-2">
                @for (t of project.technologies; track t) {
                  <span class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 text-purple-300">
                    {{ t }}
                  </span>
                }
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-5 py-3 border-t border-slate-800 bg-[#0e1424] flex items-center justify-between">
            <a
              [href]="project.githubUrl || portfolioService.profile().github"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <mat-icon class="text-sm! w-4! h-4!">code</mat-icon>
              <span>View on GitHub</span>
            </a>

            <button
              type="button"
              (click)="portfolioService.closeProjectModal()"
              class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ProjectModal {
  readonly portfolioService = inject(Portfolio);
}
