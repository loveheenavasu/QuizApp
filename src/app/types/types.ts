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
export interface IQuizCardData{
    quizData: [];
    handleOptions: () => void;
    selectedOption: string | null;
    handleClick: () => void;
    answerVisibility: boolean[];

}