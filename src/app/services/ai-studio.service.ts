import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class AiStudio {
  private readonly http = inject(HttpClient);

  async transformResume(resumeText: string, roleFocus?: string): Promise<Partial<PortfolioData>> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ success: boolean; data: Partial<PortfolioData>; source?: string }>('/api/transform-cv', {
          resumeText,
          roleFocus,
        })
      );
      return response.data;
    } catch (err) {
      console.error('Failed to transform resume via backend:', err);
      throw err;
    }
  }

  async askRecruiterQuestion(question: string, candidateContext?: unknown): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ answer: string }>('/api/recruiter-qa', {
          question,
          candidateContext,
        })
      );
      return response.answer;
    } catch (err) {
      console.error('Recruiter QA call failed:', err);
      return 'I am currently operating in high-efficiency offline mode. Gauri Tawade is an MCA candidate (expected 2026) and BCA graduate (8.79 CGPA) with hands-on expertise in MySQL relational schema design, 3NF normalization, referential integrity, and full-stack development.';
    }
  }

  async generatePitch(company: string, jobTitle: string, jobRequirements?: string, candidateContext?: unknown): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ pitch: string }>('/api/generate-pitch', {
          company,
          jobTitle,
          jobRequirements,
          candidateContext,
        })
      );
      return response.pitch;
    } catch (err) {
      console.error('Pitch generation failed:', err);
      return `Dear Hiring Manager at ${company},\n\nI am thrilled to apply for the ${jobTitle} position. With hands-on experience designing normalized relational schemas across 10+ tables at Abuzz WebTech, along with my Bus Management System and machine learning recommendation projects, I bring a strong analytical mindset and database discipline.\n\nI look forward to discussing how my skills in MySQL and scalable web development can add value to ${company}.\n\nWarm regards,\nGauri Satish Tawade`;
    }
  }
}
