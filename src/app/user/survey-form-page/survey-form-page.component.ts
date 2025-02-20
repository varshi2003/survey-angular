

import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { SurveyResponse, QuestionResponse } from '../../models/SurveyResponse.model';

@Component({
  selector: 'app-survey-form-page',
  templateUrl: './survey-form-page.component.html',
  styleUrls: ['./survey-form-page.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class SurveyFormPageComponent implements OnInit {
  surveyId: string = '';
  surveyData: any = {};

  constructor(private surveyService: SurveyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.surveyId = params.get('surveyId') || '';
      console.log('🔍 Survey ID Retrieved:', this.surveyId);
  
      if (!this.surveyId) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Survey',
          text: 'Survey ID is missing!',
          confirmButtonText: 'OK',
        });
        return;
      }
  
      this.loadSurveyForm();
    });
  }
  
  

  loadSurveyForm() {
    this.surveyService.getSurveyById(this.surveyId).subscribe({
      next: (data) => {
        console.log('✅ Survey API Response:', data); 

        if (!data || !data.questions || data.questions.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Survey Not Found',
            text: 'No survey data found for this ID.',
            confirmButtonText: 'OK',
          });
          return;
        }

        this.surveyData = data;
        this.buildSurveyForm();
      },
      error: (err) => {
        console.error('❌ Survey Fetch Error:', err); 
        Swal.fire({
          icon: 'error',
          title: 'Survey failed to load',
          text: 'Survey data not loaded',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  

  buildSurveyForm() {
    setTimeout(() => {
      const form = document.getElementById('survey-form') as HTMLFormElement;
      if (!form) return;
  
      form.innerHTML = '';
  
      this.surveyData.questions.forEach((question: any, index: number) => {
        const field = document.createElement('div');
        field.className = 'form-field';
  
        const label = document.createElement('label');
        label.textContent = `${index + 1}. ${question.question}`;
        field.appendChild(label);
  
        let inputElement: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null = null;
        switch (question.type) {
          case 'Paragraph':
            inputElement = document.createElement('textarea');
            break;
          case 'MultipleChoice':
          case 'RadioButton':
            field.appendChild(this.createRadioButton(question, index));
            break;
          case 'DropDown':
            inputElement = this.createDropDown(question);
            break;
          case 'FileUpload':
            inputElement = document.createElement('input');
            inputElement.type = 'file';
            break;
          case 'DateAndTime':
            inputElement = document.createElement('input');
            inputElement.type = 'datetime-local';
            break;
          case 'Email':
            inputElement = document.createElement('input');
            inputElement.type = 'email';
            break;
          default:
            inputElement = document.createElement('input');
            inputElement.type = 'text';
        }
  
        if (inputElement) {
          inputElement.name = `question-${index}`;
        
          if (inputElement instanceof HTMLInputElement || inputElement instanceof HTMLTextAreaElement) {
            inputElement.placeholder = question.placeholder || '';  
          }
        
          field.appendChild(inputElement);
        }
        
  
        form.appendChild(field);
      });
  
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.className = 'submit-button';
      submitButton.textContent = 'Submit';
      form.appendChild(submitButton);
  
      form.addEventListener('submit', (event) => this.validateForm(event));
    }, 0);
  }
  

  createRadioButton(question: any, index: number): HTMLElement {
    const optionContainer = document.createElement('div');
    optionContainer.className = 'option-container';
    question.additionalProperties?.options?.forEach((option: string) => {
      const optionLabel = document.createElement('label');
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question-${index}`;
      optionInput.value = option;
      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));
      optionContainer.appendChild(optionLabel);
    });
    return optionContainer;
  }

  createDropDown(question: any): HTMLSelectElement {
    const selectElement = document.createElement('select');
    question.additionalProperties?.options?.forEach((option: string) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      selectElement.appendChild(optionElement);
    });
    return selectElement;
  }

  validateForm(event: Event) {
    event.preventDefault();
    const formElements = document.getElementById('survey-form') as HTMLFormElement;
    let valid = true;

    if (valid) {
      this.submitSurvey(formElements);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please correct the errors in the form.',
        confirmButtonText: 'OK',
      });
    }
  }

  submitSurvey(formElements: HTMLFormElement) {
    
    const responses: QuestionResponse[] = [];
  
    this.surveyData.questions.forEach((question: any, index: number) => {
      const element = formElements[`question-${index}`] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      const response: QuestionResponse = {
        questionId: `question-${index}`,
        questionType: question.type,
        question: question.question,
        placeholder: question.placeholder || '',
        answer: element?.value || '',
        required: question.required || false
      };
      responses.push(response);
    });
  
    const surveyResponse: SurveyResponse = {
      id: this.surveyData.id,
      surveyId: this.surveyData.id,
      responses: responses
    };
    
  
    console.log("📌 Survey Response Payload:", JSON.stringify(surveyResponse, null, 2)); // Debugging log
  
    this.surveyService.submitSurveyResponse(surveyResponse).subscribe({
      next: (response) => {
        console.log("✅ Submission Response from Backend:", response);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Survey Saved successfully!',
          confirmButtonText: 'OK',
        });
      },
      error: (err) => {
        console.error("❌ Submission Error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Error submitting survey response. Please try again.',
          confirmButtonText: 'OK',
        });
      },
    });
  }
  

}
