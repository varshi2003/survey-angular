import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {
  SurveyResponse,
  QuestionResponse,
} from '../../models/SurveyResponse.model';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-survey-form-page',
  templateUrl: './survey-form-page.component.html',
  styleUrls: ['./survey-form-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, NgFor, NgSwitch, NgSwitchCase, ReactiveFormsModule],
})
export class SurveyFormPageComponent implements OnInit {
  surveyId: string = '';
  surveyData: any = {};
  surveyForm: FormGroup;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.surveyForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.surveyId = params.get('surveyId') || '';

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
        Swal.fire({
          icon: 'error',
          title: 'Survey failed to load',
          text: 'Survey data not loaded',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  buildSurveyForm() {
    const group: { [key: string]: FormControl } = {};
    this.surveyData.questions.forEach((question: any, index: number) => {
      let validators = [];
      if (question.required) {
        validators.push(Validators.required);
      }
      if (question.type === 'Paragraph') {
        validators.push(Validators.minLength(5));
        validators.push(Validators.maxLength(100));
      }
      if (question.type === 'Email' && question.required) {
        validators.push(Validators.email);
      }
      group[`question-${index}`] = new FormControl('', validators);
    });
    this.surveyForm = this.fb.group(group);
  }
  onMultipleChoiceChange(event: Event, controlName: string) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    const control = this.surveyForm.get(controlName);
    if (!control) return;
    let selectedValues: string[] = control.value || [];
    if (checkbox.checked) {
      if (!selectedValues.includes(value)) {
        selectedValues.push(value);
      }
    } else {
      selectedValues = selectedValues.filter(v => v !== value);
    }
    control.setValue(selectedValues);
    control.markAsTouched();
  }

  onParagraphKeydown(event: KeyboardEvent, controlName: string) {
    const control = this.surveyForm.get(controlName);
    if (!control) return;
    const currentValue = control.value || '';
    if (
      currentValue.length >= 100 &&
      ![8, 37, 38, 39, 40, 46].includes(event.keyCode)
    ) {
      event.preventDefault();
    }
  }

  onParagraphPaste(event: ClipboardEvent, controlName: string) {
    const control = this.surveyForm.get(controlName);
    if (!control) return;
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const currentValue = control.value || '';
    let newValue = currentValue + pasteData;
    if (newValue.length > 100) {
      newValue = newValue.substring(0, 100);
    }
    control.setValue(newValue);
  }

  onSubmit() {
    Object.keys(this.surveyForm.controls).forEach((key) => {
      this.surveyForm.get(key)?.markAsTouched();
    });

    if (this.surveyForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please correct the errors in the form.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const responses: QuestionResponse[] = [];
    this.surveyData.questions.forEach((question: any, index: number) => {
      const answer = this.surveyForm.get(`question-${index}`)?.value || '';
      const response: QuestionResponse = {
        questionId: `question-${index}`,
        questionType: question.type,
        question: question.question,
        placeholder: question.placeholder || '',
        answer: answer,
        required: question.required || false,
      };
      responses.push(response);
    });

    const surveyResponse: SurveyResponse = {
      id: this.surveyData.id,
      surveyId: this.surveyData.id,
      responses: responses,
    };

    Swal.fire({
      title: 'Submitting Survey...',
      text: 'Please wait.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.surveyService.submitSurveyResponse(surveyResponse).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Survey saved successfully!',
          confirmButtonText: 'OK',
        });
      },
      error: (err) => {
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
