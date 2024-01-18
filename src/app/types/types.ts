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
    currentQuestions: IQuestion[];
    handleOptions: (options: string, indexOfLastQuestion: number, correctAnswer: string, visibilityLength: number) => void;
    selectedOption: string[];
    handleClick: (questionIndex: number) => void;
    answerVisibility: boolean[];
    collectedOptions: string[];
    indexOfLastQuestion: number;
    handlePagination: (currentPage: number, count: number) => void;
    currentPage: number;
    
}