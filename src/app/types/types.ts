interface question{
    text:string
}

export interface IQuestion {
    category: string;
    correctAnswer: string;
    difficulty: string;
    id: string;
    incorrectAnswers: [];
    question: question;
}