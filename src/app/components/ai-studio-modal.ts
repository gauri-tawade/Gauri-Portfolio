import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio, SAMPLE_RESUME_PRESETS } from '../services/portfolio.service';
import { AiStudio } from '../services/ai-studio.service';

@Component({
  selector: 'app-ai-studio-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (portfolioService.aiStudioModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <div class="w-full max-w-4xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
          <!-- Header -->
          <div class="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1424]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center">
                <mat-icon class="text-xl! w-6! h-6!">auto_awesome</mat-icon>
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>AI Resume-to-Portfolio Studio</span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-medium">
                    Free AI · No Coding Required
                  </span>
                </h3>
                <p class="text-xs text-slate-400">
                  Transform ANY Resume or CV into a premium, professional online portfolio in seconds.
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="portfolioService.closeAiStudioModal()"
              class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <mat-icon class="text-lg! w-5! h-5!">close</mat-icon>
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-6">
            <!-- Tutorial Pill Bar -->
            <div class="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-950/40 border border-purple-500/20 text-xs text-slate-300 space-y-2">
              <div class="flex items-center justify-between font-semibold text-purple-300">
                <span class="flex items-center gap-1.5">
                  <mat-icon class="text-sm! w-4! h-4! text-purple-400">tips_and_updates</mat-icon>
                  How it Works in 3 Simple Steps:
                </span>
                <span class="text-[11px] text-slate-400">Powered by Gemini 3.8 Flash</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                <div class="p-2 rounded bg-black/30 border border-slate-800/80">
                  <strong class="text-purple-300 block mb-0.5">1. Paste or Load CV</strong>
                  <span>Use sample presets or paste any raw resume text or job history.</span>
                </div>
                <div class="p-2 rounded bg-black/30 border border-slate-800/80">
                  <strong class="text-indigo-300 block mb-0.5">2. Click "Transform"</strong>
                  <span>AI extracts your projects, normalized metrics, skills & achievements.</span>
                </div>
                <div class="p-2 rounded bg-black/30 border border-slate-800/80">
                  <strong class="text-emerald-300 block mb-0.5">3. Live Portfolio</strong>
                  <span>Your personalized website updates instantly, ready for recruiters.</span>
                </div>
              </div>
            </div>

            <!-- Preset Loaders -->
            <div class="space-y-2">
              <span class="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Quick Test with Sample Resumes:
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                @for (preset of presets; track preset.id) {
                  <button
                    type="button"
                    (click)="loadPreset(preset)"
                    class="p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5"
                    [class.bg-purple-950/40]="selectedPresetId() === preset.id"
                    [class.border-purple-500/50]="selectedPresetId() === preset.id"
                    [class.bg-[#0d121e]]="selectedPresetId() !== preset.id"
                    [class.border-slate-800]="selectedPresetId() !== preset.id"
                  >
                    <mat-icon class="text-sm! w-4! h-4! text-purple-400 shrink-0">{{ preset.icon }}</mat-icon>
                    <div class="truncate">
                      <p class="text-xs font-semibold text-slate-200 truncate">{{ preset.label }}</p>
                      <p class="text-[10px] text-slate-400 truncate">{{ preset.role }}</p>
                    </div>
                  </button>
                }
              </div>
            </div>

            <!-- Role Focus & File Import -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div class="sm:col-span-8 space-y-1.5">
                <label for="target-role-input" class="text-xs font-semibold text-slate-300 block">
                  Target Role / Specialization Focus:
                </label>
                <input
                  id="target-role-input"
                  type="text"
                  [value]="roleFocus()"
                  (input)="onRoleFocusChange($event)"
                  placeholder="e.g. SQL Developer / Database Administrator / Full-Stack"
                  class="w-full px-3.5 py-2 rounded-xl bg-[#080b12] border border-slate-700 text-xs sm:text-sm text-slate-100 outline-none focus:border-purple-500"
                />
              </div>

              <div class="sm:col-span-4 flex items-center gap-2">
                <label for="cv-file-upload-input" class="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                  <mat-icon class="text-sm! w-4! h-4! text-indigo-400">upload_file</mat-icon>
                  <span>Upload .txt / .json</span>
                  <input id="cv-file-upload-input" type="file" accept=".txt,.json,.md" (change)="onFileUpload($event)" class="hidden" />
                </label>
              </div>
            </div>

            <!-- Raw Resume Text Area -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label for="resume-content-textarea" class="text-xs font-semibold text-slate-300 block">
                  Resume / CV Text Content:
                </label>
                <span class="text-[11px] text-slate-500 font-mono">
                  {{ resumeText().length }} characters
                </span>
              </div>
              <textarea
                id="resume-content-textarea"
                [value]="resumeText()"
                (input)="onResumeTextChange($event)"
                rows="7"
                class="w-full p-3.5 rounded-xl bg-[#080b12] border border-slate-700 text-xs font-mono text-slate-200 outline-none focus:border-purple-500 resize-none leading-relaxed"
                placeholder="Paste any resume text here... (experience, skills, projects, contact info, education)"
              ></textarea>
            </div>

            <!-- Action State / Feedback -->
            @if (errorMessage()) {
              <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                <mat-icon class="text-sm! w-4! h-4! text-rose-400">error</mat-icon>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            @if (successMessage()) {
              <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <mat-icon class="text-sm! w-4! h-4! text-emerald-400">check_circle</mat-icon>
                <span>{{ successMessage() }}</span>
              </div>
            }
          </div>

          <!-- Footer Actions -->
          <div class="px-5 py-4 border-t border-slate-800 bg-[#0e1424] flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="resetToGauri()"
                class="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Reset to Gauri Tawade
              </button>
            </div>

            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="portfolioService.closeAiStudioModal()"
                class="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                (click)="transformAndApply()"
                [disabled]="isTransforming() || !resumeText().trim()"
                class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-900/40 flex items-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                @if (isTransforming()) {
                  <mat-icon class="text-sm! w-4! h-4! animate-spin">refresh</mat-icon>
                  <span>Transforming with AI...</span>
                } @else {
                  <mat-icon class="text-sm! w-4! h-4!">auto_awesome</mat-icon>
                  <span>Transform & Apply to Portfolio 🚀</span>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class AiStudioModal {
  readonly portfolioService = inject(Portfolio);
  readonly aiStudio = inject(AiStudio);

  readonly presets = SAMPLE_RESUME_PRESETS;
  readonly selectedPresetId = signal<string>('sql-dev');
  readonly roleFocus = signal<string>('SQL Developer & Database Design');
  readonly resumeText = signal<string>(SAMPLE_RESUME_PRESETS[0].snippet);

  readonly isTransforming = signal<boolean>(false);
  readonly errorMessage = signal<string>('');
  readonly successMessage = signal<string>('');

  loadPreset(preset: (typeof SAMPLE_RESUME_PRESETS)[0]) {
    this.selectedPresetId.set(preset.id);
    this.resumeText.set(preset.snippet);
    this.roleFocus.set(preset.role);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  onResumeTextChange(event: Event) {
    const val = (event.target as HTMLTextAreaElement).value;
    this.resumeText.set(val);
  }

  onRoleFocusChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.roleFocus.set(val);
  }

  onFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        this.resumeText.set(content);
        this.successMessage.set(`Successfully loaded ${file.name}!`);
      }
    };
    reader.readAsText(file);
  }

  async transformAndApply() {
    if (!this.resumeText().trim()) {
      this.errorMessage.set('Please provide resume or CV text to transform.');
      return;
    }

    this.isTransforming.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const data = await this.aiStudio.transformResume(this.resumeText(), this.roleFocus());
      if (data) {
        this.portfolioService.applyImportedPortfolio(data);
        this.successMessage.set('Portfolio successfully updated with your transformed resume!');
      }
    } catch {
      this.errorMessage.set('Could not transform resume at this moment. Please check text and retry.');
    } finally {
      this.isTransforming.set(false);
    }
  }

  resetToGauri() {
    this.portfolioService.resetToGauriDefault();
    this.loadPreset(SAMPLE_RESUME_PRESETS[0]);
    this.successMessage.set("Reset to Gauri Tawade's full profile.");
  }
}
