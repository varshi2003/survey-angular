
export interface SurveyResponse {
    id: string;
    surveyId: string;
    responses: QuestionResponse[];
  }
  
  export interface QuestionResponse {
    questionId: string;
    questionType: string;
    question: string;
    placeholder?: string;
    answer: any;
    required: boolean;
  }
  