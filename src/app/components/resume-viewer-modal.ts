import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-resume-viewer-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (portfolioService.resumeModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <div class="w-full max-w-5xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col h-[90vh] overflow-hidden">
          <!-- Header -->
          <div class="px-5 py-4 border-b border-slate-800 bg-[#0e1424] flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center">
                <mat-icon class="text-xl! w-6! h-6!">description</mat-icon>
              </div>
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <span>Resume Document Viewer</span>
                  <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    ATS Score: 94%
                  </span>
                </h3>
                <p class="text-xs text-slate-400">
                  Gauri Satish Tawade · Verified Resume Files (PDF)
                </p>
              </div>
            </div>

            <!-- Version Switcher -->
            <div class="flex items-center gap-2">
              <div class="p-1 rounded-xl bg-slate-900 border border-slate-800 flex text-xs font-medium">
                <button
                  type="button"
                  (click)="setVersion('/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf')"
                  class="px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  [class.bg-purple-600]="activePdf() === '/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf'"
                  [class.text-white]="activePdf() === '/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf'"
                  [class.text-slate-400]="activePdf() !== '/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf'"
                >
                  SQL Developer (ATS)
                </button>
                <button
                  type="button"
                  (click)="setVersion('/assets/aistudio/Gauri_Tawade_Resume__2__a9137a13.pdf')"
                  class="px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  [class.bg-purple-600]="activePdf() === '/assets/aistudio/Gauri_Tawade_Resume__2__a9137a13.pdf'"
                  [class.text-white]="activePdf() === '/assets/aistudio/Gauri_Tawade_Resume__2__a9137a13.pdf'"
                  [class.text-slate-400]="activePdf() !== '/assets/aistudio/Gauri_Tawade_Resume__2__a9137a13.pdf'"
                >
                  Full-Stack Version
                </button>
              </div>

              <!-- Download Button -->
              <a
                [href]="activePdf()"
                download="Gauri_Tawade_Resume.pdf"
                class="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <mat-icon class="text-sm! w-4! h-4!">download</mat-icon>
                <span>Download</span>
              </a>

              <button
                type="button"
                (click)="portfolioService.closeResumeModal()"
                class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              >
                <mat-icon class="text-lg! w-5! h-5!">close</mat-icon>
              </button>
            </div>
          </div>

          <!-- PDF Viewer Frame -->
          <div class="flex-1 bg-slate-950 p-2 overflow-hidden relative">
            <iframe
              [src]="safePdfUrl()"
              class="w-full h-full rounded-xl border border-slate-800 bg-white"
              title="Resume Preview"
            ></iframe>
          </div>

          <!-- Footer -->
          <div class="px-5 py-3 border-t border-slate-800 bg-[#0e1424] flex items-center justify-between text-xs">
            <div class="flex items-center gap-2 text-slate-300">
              <mat-icon class="text-sm! w-4! h-4! text-emerald-400">check_circle</mat-icon>
              <span>ATS Compliant layout optimized for Applicant Tracking Systems and tech recruiters</span>
            </div>
            <button
              type="button"
              (click)="portfolioService.closeResumeModal()"
              class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ResumeViewerModal {
  readonly portfolioService = inject(Portfolio);
  private readonly sanitizer = inject(DomSanitizer);

  readonly activePdf = signal<string>('/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf');
  readonly safePdfUrl = signal<SafeResourceUrl>(
    this.sanitizer.bypassSecurityTrustResourceUrl('/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf')
  );

  setVersion(url: string) {
    this.activePdf.set(url);
    this.safePdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
