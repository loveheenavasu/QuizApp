"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { IQuestion } from "../../types/types";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

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
    (selectedOption: string, questionIndex: number) => {
      setSelectedOption((prev) => {
        let newVisibility = [...prev];
        newVisibility[questionIndex] = selectedOption;
        return newVisibility;
      });
    },
    []
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
          <Box color="white" sx={{ m: 5 }}>
            {currentQuestions?.map((info: IQuestion, questionIndex: number) => (
              <Card
                key={questionIndex}
                sx={{
                  width: "470px",
                  borderRadius: ".7rem",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.06)",
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <CircleIcon sx={{ fontSize: "10px" }} />
                    <Typography ml={2} sx={{ fontSize: "18px" }}>
                      {info?.question?.text}
                    </Typography>
                  </Box>
                  <Box mb={1} mt={2}>
                    {collectedOptions.map((options, index) => (
                      <Typography
                        key={index}
                        onClick={() =>
                          handleOptions(options, indexOfLastQuestion)
                        }
                        sx={{
                          cursor: "pointer",
                          ml: 2,
                          mt: 1,
                          p: 1,
                          borderRadius: ".7rem",
                          border: "1px solid #DEE5EF",
                          backgroundColor:
                            selectedOption[indexOfLastQuestion] === options
                              ? options === info.correctAnswer
                                ? "#058a05"
                                : "#e74c3c"
                              : "",
                        }}
                      >
                        {options}
                      </Typography>
                    ))}
                  </Box>
                  <Box ml={2} mt={2}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      flexWrap="wrap"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleClick(questionIndex)}
                      >
                        {answerVisibility[questionIndex]
                          ? "Hide Answer"
                          : "View Answer"}
                      </Button>
                      <Box display="flex" gap="10px">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => {
                            handlePagination(currentPage, -1);
                          }}
                          disabled={currentPage === 1}
                        >
                          <ArrowBackIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => {
                            handlePagination(currentPage, 1);
                          }}
                          disabled={currentPage === answerVisibility.length}
                        >
                          <ArrowForwardIcon />
                        </Button>
                      </Box>
                    </Box>

                    {answerVisibility[questionIndex] && (
                      <Typography
                        mt={2}
                        sx={{
                          color: "green",
                          border: "1px solid green",
                          borderRadius: ".7rem",
                          p: 1,
                        }}
                      >
                        {info?.correctAnswer}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Grid2>
  );
}
