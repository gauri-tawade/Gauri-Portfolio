import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="contact" class="py-16 border-t border-slate-900 bg-[#07090f] relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <!-- Banner matched to User Mockup: "Let's Work Together" -->
        <div class="rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#101426] to-indigo-950/40 border border-purple-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex items-center gap-5 z-10">
            <div class="w-14 h-14 rounded-2xl bg-purple-900/50 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 shadow-lg shadow-purple-950/50">
              <mat-icon class="text-2xl! w-7! h-7!">send</mat-icon>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Let's Work Together
              </h2>
              <p class="text-slate-300 text-sm sm:text-base">
                I'm open to new opportunities and exciting engineering projects. Feel free to reach out!
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 z-10 shrink-0">
            <a
              [href]="'mailto:' + portfolioService.profile().email"
              class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              <mat-icon class="text-base! w-5! h-5!">mail</mat-icon>
              <span>Get In Touch</span>
            </a>
          </div>
        </div>

        <!-- Detailed Contact Channels & Message Box -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left: Contact Details Cards -->
          <div class="lg:col-span-5 space-y-4">
            <h3 class="text-lg font-bold text-slate-200 flex items-center gap-2">
              <mat-icon class="text-purple-400">contact_phone</mat-icon>
              <span>Direct Channels</span>
            </h3>

            <!-- Email Card -->
            <div class="p-4 rounded-xl bg-[#0d121e] border border-slate-800 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 truncate">
                <div class="w-10 h-10 rounded-lg bg-purple-950/60 text-purple-300 flex items-center justify-center shrink-0">
                  <mat-icon class="text-lg! w-5! h-5!">mail</mat-icon>
                </div>
                <div class="truncate">
                  <span class="text-[11px] text-slate-500 uppercase block font-semibold">Email</span>
                  <a [href]="'mailto:' + portfolioService.profile().email" class="text-xs sm:text-sm font-mono text-slate-200 hover:text-purple-300 transition-colors truncate">
                    {{ portfolioService.profile().email }}
                  </a>
                </div>
              </div>
              <button
                type="button"
                (click)="copyToClipboard(portfolioService.profile().email, 'email')"
                class="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer shrink-0"
              >
                {{ copiedType() === 'email' ? 'Copied' : 'Copy' }}
              </button>
            </div>

            <!-- Phone Card -->
            <div class="p-4 rounded-xl bg-[#0d121e] border border-slate-800 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 truncate">
                <div class="w-10 h-10 rounded-lg bg-indigo-950/60 text-indigo-300 flex items-center justify-center shrink-0">
                  <mat-icon class="text-lg! w-5! h-5!">call</mat-icon>
                </div>
                <div>
                  <span class="text-[11px] text-slate-500 uppercase block font-semibold">Phone</span>
                  <a [href]="'tel:' + portfolioService.profile().phone" class="text-xs sm:text-sm font-mono text-slate-200 hover:text-indigo-300 transition-colors">
                    {{ portfolioService.profile().phone }}
                  </a>
                </div>
              </div>
              <button
                type="button"
                (click)="copyToClipboard(portfolioService.profile().phone, 'phone')"
                class="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer shrink-0"
              >
                {{ copiedType() === 'phone' ? 'Copied' : 'Copy' }}
              </button>
            </div>

            <!-- Location Card -->
            <div class="p-4 rounded-xl bg-[#0d121e] border border-slate-800 flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-emerald-950/60 text-emerald-300 flex items-center justify-center shrink-0">
                <mat-icon class="text-lg! w-5! h-5!">location_on</mat-icon>
              </div>
              <div>
                <span class="text-[11px] text-slate-500 uppercase block font-semibold">Location</span>
                <span class="text-xs sm:text-sm text-slate-200">
                  {{ portfolioService.profile().location }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right: Interactive Message Dispatcher -->
          <div class="lg:col-span-7 p-6 rounded-2xl bg-[#0c101c] border border-slate-800 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <mat-icon class="text-purple-400">mail</mat-icon>
                <span>Send a Message to Gauri</span>
              </h3>
              <span class="text-xs text-slate-500">Fast Response within 24h</span>
            </div>

            @if (messageSent()) {
              <div class="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <mat-icon class="text-base! w-5! h-5! text-emerald-400">check_circle</mat-icon>
                <span>Thank you! Your message has been prepared. You can also contact directly via {{ portfolioService.profile().email }}.</span>
              </div>
            }

            <form (submit)="sendMessage($event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="contact-sender-name" class="text-xs font-medium text-slate-300 block mb-1">Your Name</label>
                  <input
                    id="contact-sender-name"
                    type="text"
                    [value]="senderName()"
                    (input)="senderName.set($any($event.target).value)"
                    placeholder="e.g. Rahul Sharma"
                    required
                    class="w-full px-3.5 py-2.5 rounded-xl bg-[#07090f] border border-slate-700 text-xs text-slate-100 outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label for="contact-sender-email" class="text-xs font-medium text-slate-300 block mb-1">Your Email</label>
                  <input
                    id="contact-sender-email"
                    type="email"
                    [value]="senderEmail()"
                    (input)="senderEmail.set($any($event.target).value)"
                    placeholder="e.g. rahul@company.com"
                    required
                    class="w-full px-3.5 py-2.5 rounded-xl bg-[#07090f] border border-slate-700 text-xs text-slate-100 outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label for="contact-subject" class="text-xs font-medium text-slate-300 block mb-1">Subject / Role Offer</label>
                <input
                  id="contact-subject"
                  type="text"
                  [value]="subject()"
                  (input)="subject.set($any($event.target).value)"
                  placeholder="e.g. Opportunity: SQL Developer at TechCorp"
                  required
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#07090f] border border-slate-700 text-xs text-slate-100 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label for="contact-message-body" class="text-xs font-medium text-slate-300 block mb-1">Message</label>
                <textarea
                  id="contact-message-body"
                  [value]="messageBody()"
                  (input)="messageBody.set($any($event.target).value)"
                  rows="4"
                  placeholder="Hi Gauri, we reviewed your normalized database projects and would love to connect..."
                  required
                  class="w-full p-3.5 rounded-xl bg-[#07090f] border border-slate-700 text-xs text-slate-100 outline-none focus:border-purple-500 resize-none leading-relaxed"
                ></textarea>
              </div>

              <div class="flex items-center justify-between pt-1">
                <span class="text-[11px] text-slate-500">
                  Pre-fills direct email to tawadegauri403&#64;gmail.com
                </span>

                <button
                  type="submit"
                  class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-purple-900/30"
                >
                  <mat-icon class="text-sm! w-4! h-4!">send</mat-icon>
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  readonly portfolioService = inject(Portfolio);

  readonly senderName = signal<string>('');
  readonly senderEmail = signal<string>('');
  readonly subject = signal<string>('Interview Invitation: SQL Developer Role');
  readonly messageBody = signal<string>(
    'Hi Gauri, I reviewed your normalized database architecture projects and 6-month internship at Abuzz WebTech. We would like to invite you for an interview.'
  );

  readonly messageSent = signal<boolean>(false);
  readonly copiedType = signal<string>('');

  copyToClipboard(text: string, type: string) {
    navigator.clipboard.writeText(text);
    this.copiedType.set(type);
    setTimeout(() => this.copiedType.set(''), 2000);
  }

  sendMessage(event: Event) {
    event.preventDefault();
    this.messageSent.set(true);

    const mailto = `mailto:${this.portfolioService.profile().email}?subject=${encodeURIComponent(
      this.subject()
    )}&body=${encodeURIComponent(
      `From: ${this.senderName()} (${this.senderEmail()})\n\n${this.messageBody()}`
    )}`;

    window.location.href = mailto;
  }
}
