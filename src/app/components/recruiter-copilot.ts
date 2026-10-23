import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';
import { AiStudio } from '../services/ai-studio.service';

@Component({
  selector: 'app-recruiter-copilot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (portfolioService.copilotOpen()) {
      <div class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0a0e18] border-l border-slate-700/80 shadow-2xl flex flex-col backdrop-blur-xl animate-in slide-in-from-right duration-300">
        <!-- Drawer Header -->
        <div class="px-5 py-4 border-b border-slate-800 bg-[#0e1424] flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center">
              <mat-icon class="text-base! w-4! h-4!">psychology</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Recruiter Copilot</span>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  AI Agent
                </span>
              </h3>
              <p class="text-[11px] text-slate-400">Ask candidate questions or draft custom job pitches</p>
            </div>
          </div>

          <button
            type="button"
            (click)="portfolioService.toggleCopilot()"
            class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <mat-icon class="text-base! w-4! h-4!">close</mat-icon>
          </button>
        </div>

        <!-- Mode Toggle (Q&A vs Tailored Pitch) -->
        <div class="px-5 pt-4 pb-2">
          <div class="p-1 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-2 gap-1 text-xs font-medium">
            <button
              type="button"
              (click)="activeTab.set('qa')"
              class="py-1.5 rounded-lg transition-colors cursor-pointer"
              [class.bg-purple-600]="activeTab() === 'qa'"
              [class.text-white]="activeTab() === 'qa'"
              [class.text-slate-400]="activeTab() !== 'qa'"
            >
              Candidate Q&A
            </button>
            <button
              type="button"
              (click)="activeTab.set('pitch')"
              class="py-1.5 rounded-lg transition-colors cursor-pointer"
              [class.bg-purple-600]="activeTab() === 'pitch'"
              [class.text-white]="activeTab() === 'pitch'"
              [class.text-slate-400]="activeTab() !== 'pitch'"
            >
              Generate Role Pitch
            </button>
          </div>
        </div>

        <!-- Tab 1: Candidate Q&A -->
        @if (activeTab() === 'qa') {
          <div class="flex-1 overflow-y-auto px-5 py-3 space-y-4">
            <!-- Suggested Questions -->
            <div class="space-y-1.5">
              <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Quick Suggested Questions:
              </span>
              <div class="space-y-1.5">
                @for (q of suggestedQuestions; track q) {
                  <button
                    type="button"
                    (click)="askPresetQuestion(q)"
                    class="w-full text-left p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <span class="line-clamp-1">{{ q }}</span>
                    <mat-icon class="text-xs! w-3! h-3! text-purple-400 opacity-60 group-hover:opacity-100">arrow_forward</mat-icon>
                  </button>
                }
              </div>
            </div>

            <!-- Conversation Display -->
            @if (isLoading()) {
              <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2 text-xs text-purple-300">
                <mat-icon class="text-sm! w-4! h-4! animate-spin">refresh</mat-icon>
                <span>Analyzing Gauri's credentials with Gemini...</span>
              </div>
            }

            @if (lastAnswer()) {
              <div class="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                <div class="flex items-center justify-between text-[11px] font-semibold text-purple-300">
                  <span class="flex items-center gap-1">
                    <mat-icon class="text-xs! w-3.5! h-3.5!">verified</mat-icon>
                    Candidate Agent Response:
                  </span>
                  <button
                    type="button"
                    (click)="copyAnswer()"
                    class="text-slate-400 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    <mat-icon class="text-xs! w-3! h-3!">content_copy</mat-icon>
                    <span>{{ copied() ? 'Copied' : 'Copy' }}</span>
                  </button>
                </div>
                <div class="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {{ lastAnswer() }}
                </div>
              </div>
            }
          </div>

          <!-- Question Input -->
          <div class="p-4 border-t border-slate-800 bg-[#0e1424]">
            <form (submit)="submitCustomQuestion($event)" class="flex gap-2">
              <input
                type="text"
                [value]="customQuestion()"
                (input)="onQuestionInput($event)"
                placeholder="Ask about SQL, projects, experience..."
                class="flex-1 px-3 py-2 rounded-xl bg-[#080b12] border border-slate-700 text-xs text-slate-100 outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                [disabled]="isLoading() || !customQuestion().trim()"
                class="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-xs flex items-center justify-center cursor-pointer"
              >
                <mat-icon class="text-sm! w-4! h-4!">send</mat-icon>
              </button>
            </form>
          </div>
        }

        <!-- Tab 2: Tailored Pitch Generator -->
        @if (activeTab() === 'pitch') {
          <div class="flex-1 overflow-y-auto px-5 py-3 space-y-4">
            <p class="text-xs text-slate-400">
              Provide your organization and role title to generate a targeted pitch letter tailored to Gauri's background.
            </p>

            <div class="space-y-3">
              <div>
                <label for="pitch-company-name-input" class="text-[11px] font-semibold text-slate-300 block mb-1">Company / Team Name:</label>
                <input
                  id="pitch-company-name-input"
                  type="text"
                  [value]="companyName()"
                  (input)="companyName.set($any($event.target).value)"
                  placeholder="e.g. Swiggy, TCS, FinTech Innovations"
                  class="w-full px-3 py-2 rounded-xl bg-[#080b12] border border-slate-700 text-xs text-slate-100 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label for="pitch-job-title-input" class="text-[11px] font-semibold text-slate-300 block mb-1">Job Title:</label>
                <input
                  id="pitch-job-title-input"
                  type="text"
                  [value]="jobTitle()"
                  (input)="jobTitle.set($any($event.target).value)"
                  placeholder="e.g. Junior SQL Developer / Backend Engineer"
                  class="w-full px-3 py-2 rounded-xl bg-[#080b12] border border-slate-700 text-xs text-slate-100 outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="button"
                (click)="generateCustomPitch()"
                [disabled]="isGeneratingPitch() || !companyName().trim() || !jobTitle().trim()"
                class="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                @if (isGeneratingPitch()) {
                  <mat-icon class="text-sm! w-4! h-4! animate-spin">refresh</mat-icon>
                  <span>Drafting Tailored Pitch...</span>
                } @else {
                  <mat-icon class="text-sm! w-4! h-4!">auto_awesome</mat-icon>
                  <span>Generate Personalized Pitch</span>
                }
              </button>
            </div>

            @if (pitchResult()) {
              <div class="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2 mt-3">
                <div class="flex items-center justify-between text-[11px] font-semibold text-purple-300">
                  <span>Tailored Cover Note:</span>
                  <button
                    type="button"
                    (click)="copyPitch()"
                    class="text-slate-400 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    <mat-icon class="text-xs! w-3! h-3!">content_copy</mat-icon>
                    <span>{{ pitchCopied() ? 'Copied' : 'Copy Pitch' }}</span>
                  </button>
                </div>
                <div class="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                  {{ pitchResult() }}
                </div>
              </div>
            }
          </div>
        }
      </div>
    }
  `,
})
export class RecruiterCopilot {
  readonly portfolioService = inject(Portfolio);
  readonly aiStudio = inject(AiStudio);

  readonly activeTab = signal<'qa' | 'pitch'>('qa');

  readonly suggestedQuestions = [
    'How did Gauri design the 10+ table MySQL schema at Abuzz WebTech?',
    'Explain her Bus Management System normalization and referential integrity.',
    'What is her experience with Python, Pandas, and Machine Learning?',
    'What are her academic credentials and distinction highlights?',
  ];

  readonly customQuestion = signal<string>('');
  readonly lastAnswer = signal<string>('');
  readonly isLoading = signal<boolean>(false);
  readonly copied = signal<boolean>(false);

  readonly companyName = signal<string>('Tech Solutions');
  readonly jobTitle = signal<string>('SQL Developer (Junior / Fresher)');
  readonly pitchResult = signal<string>('');
  readonly isGeneratingPitch = signal<boolean>(false);
  readonly pitchCopied = signal<boolean>(false);

  onQuestionInput(event: Event) {
    this.customQuestion.set((event.target as HTMLInputElement).value);
  }

  async askPresetQuestion(question: string) {
    this.customQuestion.set(question);
    await this.processQuestion(question);
  }

  async submitCustomQuestion(event: Event) {
    event.preventDefault();
    const q = this.customQuestion().trim();
    if (!q) return;
    await this.processQuestion(q);
  }

  private async processQuestion(q: string) {
    this.isLoading.set(true);
    this.copied.set(false);
    try {
      const ans = await this.aiStudio.askRecruiterQuestion(q, this.portfolioService.profile());
      this.lastAnswer.set(ans);
    } catch {
      this.lastAnswer.set('Gauri has solid technical foundation in MySQL schema design, referential integrity, and full-stack development.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async generateCustomPitch() {
    this.isGeneratingPitch.set(true);
    this.pitchCopied.set(false);
    try {
      const pitch = await this.aiStudio.generatePitch(
        this.companyName(),
        this.jobTitle(),
        undefined,
        this.portfolioService.profile()
      );
      this.pitchResult.set(pitch);
    } finally {
      this.isGeneratingPitch.set(false);
    }
  }

  copyAnswer() {
    if (this.lastAnswer()) {
      navigator.clipboard.writeText(this.lastAnswer());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }

  copyPitch() {
    if (this.pitchResult()) {
      navigator.clipboard.writeText(this.pitchResult());
      this.pitchCopied.set(true);
      setTimeout(() => this.pitchCopied.set(false), 2000);
    }
  }
}
