import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-create-form',
  templateUrl: './admin-create-form.component.html',
  styleUrls: ['./admin-create-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class AdminCreateFormComponent implements OnInit {
  surveyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      surveyName: ['', [Validators.required, Validators.maxLength(20)]],
      surveyDescription: ['', Validators.maxLength(60)],
      surveyImage: [null],
      questions: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      type: ['Paragraph', Validators.required],
      question: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      placeholder: [''],
      required: [false],
      additionalProperties: this.fb.group({
        options: this.fb.array([]),
      }),
    });
    this.questions.push(questionGroup);
  }

  confirmRemoveQuestion(index: number): void {
    Swal.fire({
      title: 'Remove Question',
      text: 'Are you sure you want to delete this question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeQuestion(index);
        Swal.fire('Removed!', 'The question has been removed.', 'success');
      }
    });
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  confirmEditQuestion(index: number): void {
    const questionGroup = this.questions.at(index) as FormGroup;
    const currentQuestion = questionGroup.get('question')?.value || '';
    Swal.fire({
      title: 'Edit Question',
      input: 'text',
      inputLabel: 'Edit your question:',
      inputValue: currentQuestion,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.trim().length < 5 || value.trim().length > 100) {
          return 'Question must be between 5 and 100 characters.';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value !== undefined) {
        questionGroup.patchValue({ question: result.value.trim() });
        Swal.fire('Updated!', 'The question has been updated.', 'success');
      }
    });
  }

  updateType(index: number): void {
    const questionGroup = this.questions.at(index);
    const typeValue = questionGroup.get('type')?.value;

    if (['MultipleChoice', 'RadioButton', 'DropDown'].includes(typeValue)) {
      const optionsArray = questionGroup.get(
        'additionalProperties.options'
      ) as FormArray;
      if (!optionsArray) {
        questionGroup.get('additionalProperties')?.patchValue({ options: [] });
      }
    } else {
      const optionsArray = questionGroup.get(
        'additionalProperties.options'
      ) as FormArray;
      while (optionsArray && optionsArray.length > 0) {
        optionsArray.removeAt(0);
      }
    }
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions
      .at(questionIndex)
      .get('additionalProperties.options') as FormArray;
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.fb.control(''));
  }

  confirmRemoveOption(questionIndex: number, optionIndex: number): void {
    Swal.fire({
      title: 'Remove Option',
      text: 'Are you sure you want to remove this option?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeOption(questionIndex, optionIndex);
        Swal.fire('Removed!', 'The option has been removed.', 'success');
      }
    });
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.surveyForm.patchValue({
        surveyImage: file,
      });
    }
  }

  saveSurvey(): void {
    const surveyTitle = this.surveyForm.get('surveyName')?.value.trim();
    if (!surveyTitle) {
      Swal.fire('Error', 'Survey title cannot be blank.', 'error');
      return;
    }
    if (surveyTitle.length > 20) {
      Swal.fire(
        'Error',
        'Survey title must be 20 characters or less.',
        'error'
      );
      return;
    }

    if (!this.validateQuestions()) {
      return;
    }

    if (this.surveyForm.invalid) {
      Swal.fire('Error', 'Please fix errors before saving.', 'error');
      return;
    }

    const formValue = this.surveyForm.value;
    let survey: any = {
      name: formValue.surveyName.trim(),
      description: formValue.surveyDescription
        ? formValue.surveyDescription.trim()
        : '',
      imageUrl: '',
      questions: formValue.questions,
    };

    const surveyImage = formValue.surveyImage;
    if (surveyImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        survey.imageUrl = e.target.result;
        this.sendSurveyToBackend(survey);
      };
      reader.readAsDataURL(surveyImage);
    } else {
      this.sendSurveyToBackend(survey);
    }
  }

  sendSurveyToBackend(survey: any): void {
    Swal.fire({
      title: 'Saving Survey...',
      text: 'Please wait while we save your survey.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(`http://localhost:8080/api/surveys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Survey saved successfully.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: `Error saving survey: ${error.message}`,
        });
      });
  }

  confirmCancelSurvey(): void {
    Swal.fire({
      title: 'Cancel Survey',
      text: 'Are you sure you want to cancel? All unsaved questions will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'Keep Working',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelSurvey();
        Swal.fire(
          'Cancelled',
          'Survey creation has been cancelled.',
          'success'
        );
      }
    });
  }

  cancelSurvey(): void {
    this.surveyForm.reset();
    this.questions.clear();
  }

  private validateQuestions(): boolean {
    const questionsArr = this.questions.controls;
    for (let i = 0; i < questionsArr.length; i++) {
      const qGroup = questionsArr[i] as FormGroup;
      const typeValue = qGroup.get('type')?.value;
      const questionText = (qGroup.get('question')?.value || '').trim();

      if (questionText.length < 5 || questionText.length > 100) {
        Swal.fire(
          'Error',
          `Question #${i + 1} must be between 5 and 100 characters.`,
          'error'
        );
        return false;
      }
      if (['MultipleChoice', 'RadioButton', 'DropDown'].includes(typeValue)) {
        const optionsArray = qGroup.get(
          'additionalProperties.options'
        ) as FormArray;
        if (optionsArray.length < 2) {
          Swal.fire(
            'Error',
            `Question #${i + 1} must have at least 2 options.`,
            'error'
          );
          return false;
        }
      }
    }
    return true;
  }

  limitInput(event: KeyboardEvent, max: number, min?: number): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const currentLength = target.value.length;
    if (
      currentLength >= max &&
      ![8, 37, 38, 39, 40, 46].includes(event.keyCode)
    ) {
      event.preventDefault();
    }
  }

  limitPaste(event: ClipboardEvent, max: number, min?: number): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const allowedText = target.value + pasteData;
    target.value = allowedText.substring(0, max);
    target.dispatchEvent(new Event('input'));
  }
}
