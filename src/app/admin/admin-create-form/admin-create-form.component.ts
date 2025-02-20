
// import { Component ,ViewEncapsulation } from '@angular/core';
// import { NgIf, NgFor } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-admin-create-form',
//   templateUrl: './admin-create-form.component.html',
//   styleUrls: ['./admin-create-form.component.css'],
//   imports: [NgFor, NgIf, FormsModule],
//   encapsulation: ViewEncapsulation.Emulated,
// })
// export class AdminCreateFormComponent {
//   surveyName: string = '';
//   surveyDescription: string = '';
//   surveyImage: File | null = null;
//   questions: any[] = [];

//   // Method to add a new question
//   addQuestion(): void {
//     const newQuestion = {
//       type: 'Paragraph',
//       question: '',
//       placeholder: '',
//       required: false,
//       additionalProperties: { options: [] }
//     };
//     this.questions.push(newQuestion);
//   }

//   // Method to handle the change in question type
//   updateType(index: number, event: Event): void {
//     const target = event.target as HTMLSelectElement;  // Cast to HTMLSelectElement
    
//     if (target) {
//       this.questions[index].type = target.value;
//       if (['MultipleChoice', 'RadioButton', 'DropDown'].includes(target.value)) {
//         this.questions[index].additionalProperties.options = [];
//       } else {
//         delete this.questions[index].additionalProperties.options;
//       }
//     }
//   }

//   // Method to update the question content
//   updateQuestion(index: number, value: string): void {
//     this.questions[index].question = value;
//   }

//   // Method to handle saving the survey
//   saveSurvey(): void {
//     if (!this.validateSurvey()) return;

//     const survey = {
//       name: this.surveyName,
//       description: this.surveyDescription,
//       image: this.surveyImage,
//       questions: this.questions
//     };

//     // Logic to save the survey can be added here
//     console.log('Survey saved:', survey);
//   }

//   // Method to validate the survey form
//   validateSurvey(): boolean {
//     if (!this.surveyName || !this.surveyDescription) {
//       alert('Please provide survey name and description');
//       return false;
//     }
//     return true;
//   }

//   // Method to handle the removal of a question
//   removeQuestion(index: number): void {
//     if (confirm('Are you sure you want to delete this question?')) {
//       this.questions.splice(index, 1);
//     }
//   }

//   // Method to add a new option
//   addOption(index: number): void {
//     const question = this.questions[index];
//     question.additionalProperties.options.push('');
//   }

//   // Method to remove an option
//   removeOption(questionIndex: number, optionIndex: number): void {
//     const question = this.questions[questionIndex];
//     question.additionalProperties.options.splice(optionIndex, 1);
//   }

//   // Method to cancel survey creation
//   cancelSurvey(): void {
//     // Handle survey cancellation logic here
//     console.log("Survey creation cancelled.");
//   }
// }


import { Component,ViewEncapsulation } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create-form',
  templateUrl: './admin-create-form.component.html',
  styleUrls: ['./admin-create-form.component.css'],
  imports: [NgFor, NgIf, FormsModule],
  standalone : true,
  encapsulation: ViewEncapsulation.Emulated,  // Ensure styles are scoped to the component
})
export class AdminCreateFormComponent {
  surveyName: string = '';
  surveyDescription: string = '';
  surveyImage: File | null = null;
  questions: any[] = [];

  addQuestion(): void {
    const newQuestion = {
      type: 'Paragraph',
      question: '',
      placeholder: '',
      required: false,
      additionalProperties: { options: [] }
    };
    this.questions.push(newQuestion);
  }

  updateType(index: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.questions[index].type = target.value;
      if (['MultipleChoice', 'RadioButton', 'DropDown'].includes(target.value)) {
        this.questions[index].additionalProperties.options = [];
      } else {
        delete this.questions[index].additionalProperties.options;
      }
    }
  }

  updateQuestion(index: number, value: string): void {
    this.questions[index].question = value;
  }

  saveSurvey(): void {
    if (!this.validateSurvey()) return;
    const survey = {
      name: this.surveyName,
      description: this.surveyDescription,
      image: this.surveyImage,
      questions: this.questions
    };
    console.log('Survey saved:', survey);
  }

  validateSurvey(): boolean {
    if (!this.surveyName || !this.surveyDescription) {
      alert('Please provide survey name and description');
      return false;
    }
    return true;
  }

  removeQuestion(index: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questions.splice(index, 1);
    }
  }

  addOption(index: number): void {
    const question = this.questions[index];
    question.additionalProperties.options.push('');
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const question = this.questions[questionIndex];
    question.additionalProperties.options.splice(optionIndex, 1);
  }

  cancelSurvey(): void {
    console.log("Survey creation cancelled.");
  }
}
