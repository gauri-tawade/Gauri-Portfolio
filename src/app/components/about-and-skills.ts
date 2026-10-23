import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';
import { SkillItem } from '../models/portfolio.model';

@Component({
  selector: 'app-about-and-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="about" class="py-16 border-t border-slate-900 bg-[#090d15]/50 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          <!-- Left Column: About Me -->
          <div class="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 uppercase tracking-widest">
                <span>Engineering Background</span>
              </div>
              <h2 class="text-3xl font-bold text-white tracking-tight">
                About Me
              </h2>
              <div class="h-1 w-12 bg-purple-500 rounded-full"></div>

              <p class="text-slate-300 leading-relaxed text-sm sm:text-base pt-2">
                I am an MCA graduate (Master of Computer Applications, Completed) and BCA graduate with Distinction (8.79 CGPA) dedicated to software development and database engineering.
              </p>
              <p class="text-slate-400 leading-relaxed text-sm sm:text-base">
                My primary focus centers on MySQL, normalized schema design, and full-stack web applications. Through my 6-month internship at Abuzz WebTech and independent projects, I have designed 10+ table schemas with 500+ seeded records, ensuring zero redundancy and robust referential integrity.
              </p>
            </div>

            <!-- 3 Feature Highlights (Matching Screenshot) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div class="p-3.5 rounded-xl bg-[#0e1422] border border-slate-800 flex flex-col space-y-1">
                <div class="w-8 h-8 rounded-lg bg-indigo-950/60 text-indigo-400 flex items-center justify-center mb-1">
                  <mat-icon class="text-lg! w-5! h-5!">school</mat-icon>
                </div>
                <span class="text-xs font-semibold text-slate-200">BCA Graduate</span>
                <span class="text-[11px] text-slate-400">8.79 CGPA (Distinction)</span>
              </div>

              <div class="p-3.5 rounded-xl bg-[#0e1422] border border-slate-800 flex flex-col space-y-1">
                <div class="w-8 h-8 rounded-lg bg-purple-950/60 text-purple-400 flex items-center justify-center mb-1">
                  <mat-icon class="text-lg! w-5! h-5!">code</mat-icon>
                </div>
                <span class="text-xs font-semibold text-slate-200">MCA Complete</span>
                <span class="text-[11px] text-slate-400">Completed (KBC NMU)</span>
              </div>

              <div class="p-3.5 rounded-xl bg-[#0e1422] border border-slate-800 flex flex-col space-y-1">
                <div class="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center mb-1">
                  <mat-icon class="text-lg! w-5! h-5!">place</mat-icon>
                </div>
                <span class="text-xs font-semibold text-slate-200">Dhule / Pune</span>
                <span class="text-[11px] text-slate-400">Open to Opportunities</span>
              </div>
            </div>

            <!-- Recruiter Fast-Checklist -->
            <div class="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                  <mat-icon class="text-xs! w-4! h-4! text-purple-400">task_alt</mat-icon>
                  Recruiter Fast Facts
                </span>
                <span class="text-[11px] font-mono text-emerald-400">Immediate Availability</span>
              </div>
              <ul class="text-xs text-slate-300 space-y-1.5">
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span><strong>Target Roles:</strong> SQL Developer, Database Analyst, Junior Full-Stack Dev</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span><strong>Core Strength:</strong> 3NF Schema Normalization & Complex SQL JOINs</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span><strong>Experience:</strong> 6 Months at Abuzz WebTech Pvt. Ltd.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Column: Skills Grid (Design matched to mockup) -->
          <div id="skills" class="lg:col-span-7 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 class="text-3xl font-bold text-white tracking-tight">
                  Technical Skills
                </h2>
                <div class="h-1 w-12 bg-purple-500 rounded-full mt-2"></div>
              </div>

              <!-- Interactive category filter tabs -->
              <div class="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
                @for (cat of categories; track cat) {
                  <button
                    type="button"
                    (click)="selectedCategory.set(cat)"
                    class="px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    [class.bg-purple-600]="selectedCategory() === cat"
                    [class.text-white]="selectedCategory() === cat"
                    [class.text-slate-400]="selectedCategory() !== cat"
                    [class.hover:text-slate-200]="selectedCategory() !== cat"
                  >
                    {{ cat }}
                  </button>
                }
              </div>
            </div>

            <!-- Skills Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              @for (skill of displayedSkills(); track skill.name) {
                <div class="p-3.5 rounded-2xl bg-[#0c101b] border border-slate-800 hover:border-purple-500/40 hover:bg-[#101625] transition-all flex flex-col items-center justify-center text-center space-y-2 group shadow-sm">
                  <!-- Skill Icon Badge -->
                  <div class="w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-800 group-hover:border-purple-500/30 flex items-center justify-center text-purple-400 transition-colors">
                    <mat-icon class="text-xl! w-6! h-6!">{{ skill.icon || 'code' }}</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1">
                      {{ skill.name }}
                    </h4>
                    <span class="text-[11px] text-slate-500 block font-normal">
                      {{ skill.level || 'Proficient' }}
                    </span>
                  </div>
                </div>
              }
            </div>

            <!-- In-Depth Relational Database Matrix -->
            <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0e1424] to-slate-900/90 border border-indigo-500/20 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="text-sm! w-4! h-4! text-indigo-400">database</mat-icon>
                  SQL & Relational Database Mastery
                </span>
                <button
                  type="button"
                  (click)="portfolioService.openSqlModal()"
                  class="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <span>Test in Sandbox</span>
                  <mat-icon class="text-xs! w-3! h-3!">open_in_new</mat-icon>
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div class="p-2.5 rounded-lg bg-black/30 border border-slate-800/80">
                  <p class="font-semibold text-slate-100 mb-0.5">3NF Normalization</p>
                  <p class="text-[11px] text-slate-400">Splitting tables, eliminating transitive dependencies, ensuring atomic columns.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-black/30 border border-slate-800/80">
                  <p class="font-semibold text-slate-100 mb-0.5">Referential Integrity</p>
                  <p class="text-[11px] text-slate-400">Enforcing primary & foreign key constraints, cascading updates & deletes.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-black/30 border border-slate-800/80">
                  <p class="font-semibold text-slate-100 mb-0.5">Complex Querying</p>
                  <p class="text-[11px] text-slate-400">Multi-table INNER/LEFT JOINs, subqueries, GROUP BY aggregations, and indexing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutAndSkills {
  readonly portfolioService = inject(Portfolio);
  readonly selectedCategory = signal<string>('All');

  readonly categories = ['All', 'Databases', 'Languages', 'Web & Frontend', 'Tools & DevOps'];

  displayedSkills(): SkillItem[] {
    const cat = this.selectedCategory();
    const skills = this.portfolioService.profile().skills;
    if (cat === 'All') return skills;
    return skills.filter((s: SkillItem) => s.category.toLowerCase().includes(cat.toLowerCase()));
  }
}
