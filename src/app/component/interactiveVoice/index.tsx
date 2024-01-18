"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { IQuestion } from "../../types/types";
import party from "party-js";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import QuestionCard from "../questionCard";

export function InteractiveVoice() {
  const [quizData, setQuizData] = useState<IQuestion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answerVisibility, setAnswerVisibility] = useState<boolean[]>([]);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const questionsPerPage: number = 1;

  useEffect(() => {
    try {
      axios("https://the-trivia-api.com/v2/questions").then((data: any) => {
        setQuizData(data?.data);
        if (data?.status === 200) {
          setAnswerVisibility(Array(data.data.length).fill(false));
          setSelectedOption(Array(data.data.length).fill(""));
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  const handleClick = useCallback((questionIndex: number) => {
    setAnswerVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[questionIndex] = !newVisibility[questionIndex];
      return newVisibility;
    });
  }, []);

  const handleOptions = useCallback(
    (
      selectedOption: string, questionIndex: number, correctAnswer: string, visibilityLength: number
    ) => {
      if (selectedOption === correctAnswer) {
        console.log(questionIndex, visibilityLength, "showme");
        party.confetti(document.body, {
          count: party.variation.range(50, 10000),
        });
        if (questionIndex !== visibilityLength) {
          setTimeout(() => {
            setCurrentPage(currentPage + 1);
          }, 1000);
        }
      }
      setSelectedOption((prev) => {
        let newVisibility = [...prev];
        newVisibility[questionIndex] = selectedOption;
        return newVisibility;
      });
    },
    [currentPage]
  );
  const handlePagination = useCallback(
    (currentPage: number, count: number) => {
      setCurrentPage(currentPage + count);
      setAnswerVisibility(Array(answerVisibility.length).fill(false));
    },
    [answerVisibility.length]
  );

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = quizData?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  let collectedOptions: string[] = [];
  currentQuestions.map((info: IQuestion) => {
    collectedOptions.push(info?.correctAnswer);
    info.incorrectAnswers.map((option) => {
      collectedOptions.push(option);
    });
    collectedOptions.sort();
  });

  return (
    <Grid2>
      <Box mb={3} display="flex" justifyContent="center" alignItems={"center"}>
        <Typography variant="h4" color="white" p="10px 0px">
          Interactive Quiz App
        </Typography>
      </Box>
      <Box display="flex" justifyContent={"center"} alignItems={"center"}>
        {quizData.length === 0 ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <QuestionCard
            currentQuestions={currentQuestions}
            handleOptions={handleOptions}
            selectedOption={selectedOption}
            handleClick={handleClick}
            answerVisibility={answerVisibility}
            collectedOptions={collectedOptions}
            indexOfLastQuestion={indexOfLastQuestion}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        )}
      </Box>
    </Grid2>
  );
}
