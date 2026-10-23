import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';
import { SQLQueryResult } from '../models/portfolio.model';

@Component({
  selector: 'app-sql-sandbox-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (portfolioService.sqlModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <div class="w-full max-w-4xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
          <!-- Modal Header -->
          <div class="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1424]">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
                <mat-icon class="text-lg! w-5! h-5!">terminal</mat-icon>
              </div>
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <span>Interactive SQL Query Sandbox</span>
                  <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-500/30">
                    MySQL 8.0 · 3NF Engine
                  </span>
                </h3>
                <p class="text-xs text-slate-400">
                  Inspect Gauri's normalized relational schemas and execute live queries in real-time.
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="portfolioService.closeSqlModal()"
              class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <mat-icon class="text-lg! w-5! h-5!">close</mat-icon>
            </button>
          </div>

          <!-- Main Interactive Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-5">
            <!-- Schema Selector & Query Preset Chips -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="text-xs! w-4! h-4! text-purple-400">tune</mat-icon>
                  Select Query Preset:
                </span>
                <span class="text-[11px] text-slate-400">Click any preset to auto-load</span>
              </div>

              <div class="flex flex-wrap gap-2">
                @for (preset of presets; track preset.title) {
                  <button
                    type="button"
                    (click)="loadPreset(preset.query)"
                    class="px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5"
                    [class.bg-purple-950/60]="activeQuery() === preset.query"
                    [class.border-purple-500/60]="activeQuery() === preset.query"
                    [class.text-purple-200]="activeQuery() === preset.query"
                    [class.bg-slate-900]="activeQuery() !== preset.query"
                    [class.border-slate-800]="activeQuery() !== preset.query"
                    [class.text-slate-400]="activeQuery() !== preset.query"
                    [class.hover:border-slate-700]="activeQuery() !== preset.query"
                  >
                    <mat-icon class="text-xs! w-3.5! h-3.5! text-indigo-400">flash_on</mat-icon>
                    <span>{{ preset.title }}</span>
                  </button>
                }
              </div>
            </div>

            <!-- SQL Query Input Box -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                  <mat-icon class="text-xs! w-4! h-4! text-indigo-400">code</mat-icon>
                  SQL Query Editor
                </span>
                <button
                  type="button"
                  (click)="runQuery()"
                  class="px-3.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-900/40 cursor-pointer"
                >
                  <mat-icon class="text-xs! w-4! h-4!">play_arrow</mat-icon>
                  <span>Run Query</span>
                </button>
              </div>

              <div class="relative rounded-xl overflow-hidden border border-slate-700 bg-[#07090f] focus-within:border-purple-500">
                <textarea
                  [value]="activeQuery()"
                  (input)="onQueryChange($event)"
                  rows="3"
                  class="w-full bg-transparent text-slate-100 font-mono text-xs sm:text-sm p-3.5 outline-none resize-none leading-relaxed"
                  placeholder="Enter custom SQL query, e.g., SELECT * FROM routes WHERE distance_km > 250;"
                ></textarea>
              </div>
            </div>

            <!-- Query Execution Stats Bar -->
            @if (queryResult(); as res) {
              <div class="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1 text-emerald-400 font-medium">
                    <mat-icon class="text-xs! w-3.5! h-3.5!">check_circle</mat-icon>
                    Executed in {{ res.executionTimeMs }}ms
                  </span>
                  <span class="text-slate-500">·</span>
                  <span class="text-slate-400 font-mono">{{ res.rowsAffected }} rows returned</span>
                </div>
                <span class="text-slate-400 hidden sm:inline text-[11px]">{{ res.message }}</span>
              </div>

              <!-- Query Results Table -->
              <div class="rounded-xl border border-slate-800 overflow-x-auto bg-[#080b12]">
                <table class="w-full text-left text-xs font-mono">
                  <thead class="bg-slate-900/90 text-purple-300 border-b border-slate-800">
                    <tr>
                      @for (col of res.columns; track col) {
                        <th class="px-3.5 py-2.5 font-semibold uppercase tracking-wider">
                          {{ col }}
                        </th>
                      }
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/60 text-slate-300">
                    @for (row of res.rows; track $index) {
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        @for (col of res.columns; track col) {
                          <td class="px-3.5 py-2 whitespace-nowrap">
                            {{ row[col] }}
                          </td>
                        }
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }

            <!-- Architectural Note: 3NF & Referential Integrity -->
            <div class="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2 text-xs">
              <h4 class="font-bold text-indigo-300 flex items-center gap-1.5">
                <mat-icon class="text-xs! w-4! h-4! text-indigo-400">architecture</mat-icon>
                How Normalization is Enforced in Gauri's Projects:
              </h4>
              <p class="text-slate-300 leading-relaxed">
                In the <strong>Bus Management System</strong>, customer profiles, routes, vehicles, and reservations are decoupled into separate tables (<code class="text-purple-300">users</code>, <code class="text-purple-300">routes</code>, <code class="text-purple-300">buses</code>, <code class="text-purple-300">bookings</code>). Foreign key constraints prevent orphan bookings, while seat-locking queries prevent concurrency double-booking issues.
              </p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-5 py-3 border-t border-slate-800 bg-[#0e1424] flex items-center justify-between text-xs">
            <span class="text-slate-400">
              Mock database loaded with real project schema datasets.
            </span>
            <button
              type="button"
              (click)="portfolioService.closeSqlModal()"
              class="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
            >
              Close Sandbox
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class SqlSandboxModal {
  readonly portfolioService = inject(Portfolio);

  readonly presets = [
    {
      title: 'Active Buses',
      query: "SELECT * FROM buses WHERE status = 'ACTIVE';",
    },
    {
      title: 'Route Revenue & Bookings (JOIN)',
      query: 'SELECT r.route_id, r.source, r.destination, COUNT(b.booking_id) AS total_bookings FROM routes r INNER JOIN bookings b ON r.route_id = b.route_id GROUP BY r.route_id;',
    },
    {
      title: 'All Maharashtra Bus Routes',
      query: 'SELECT * FROM routes ORDER BY distance_km DESC;',
    },
    {
      title: 'Confirmed Reservations',
      query: "SELECT * FROM bookings WHERE status = 'CONFIRMED';",
    },
    {
      title: 'Candidate Tracking (Job Portal)',
      query: 'SELECT id, name, qualification, primary_skill, status FROM candidates;',
    },
  ];

  readonly activeQuery = signal<string>(this.presets[0].query);
  readonly queryResult = signal<SQLQueryResult | null>(null);

  constructor() {
    // Initial run
    this.runQuery();
  }

  loadPreset(query: string) {
    this.activeQuery.set(query);
    this.runQuery();
  }

  onQueryChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.activeQuery.set(target.value);
  }

  runQuery() {
    const res = this.portfolioService.executeSQL(this.activeQuery());
    this.queryResult.set(res);
  }
}
