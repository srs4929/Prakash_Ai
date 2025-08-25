import React, { useState } from 'react';
import { 
  Box, Typography, Button, Stack, Card, CardContent, 
  LinearProgress, Alert, alpha, useTheme 
} from '@mui/material';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mockQuestions = [
  {
    question: "Which of these is a common sign of misinformation?",
    explanation: "Sensational headlines are often used to grab attention and can be a sign of misinformation. Reliable news sources typically use more measured language.",
    options: ["Sensational headlines", "Proper citations", "Verified sources", "Recent dates"],
    correct: 0
  },
  {
    question: "What should you do when verifying a suspicious news article?",
    explanation: "Cross-referencing with multiple reliable sources is a fundamental fact-checking practice. It helps verify the authenticity of information.",
    options: ["Share it immediately", "Check multiple reliable sources", "Only read the headline", "Trust it if it has many likes"],
    correct: 1
  },
  {
    question: "Which technique is commonly used in deepfake videos?",
    explanation: "AI-powered face swapping is the primary technology behind deepfake videos, which can be used to create convincing but false content.",
    options: ["AI-powered face swapping", "High-quality filming", "Professional acting", "Traditional editing"],
    correct: 0
  },
  {
    question: "What is 'circular reporting' in news?",
    explanation: "Circular reporting occurs when multiple sources cite each other without independent verification, creating a false impression of credibility.",
    options: ["Writing in circles", "Multiple sources citing each other without original verification", "Round-the-clock news coverage", "Reporting from multiple locations"],
    correct: 1
  },
  {
    question: "What is 'confirmation bias' in the context of misinformation?",
    explanation: "Confirmation bias is our tendency to favor information that confirms our existing beliefs, which can make us more susceptible to misinformation.",
    options: ["Double-checking facts", "Believing only official sources", "Favoring information that confirms existing beliefs", "Verifying sources thoroughly"],
    correct: 2
  }
];

const QuizGame: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Initialize all questions with null
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | null }>(
    mockQuestions.reduce((acc, _, idx) => ({ ...acc, [idx]: null }), {})
  );

  const [feedback, setFeedback] = useState<{ [key: number]: boolean | null }>(
    mockQuestions.reduce((acc, _, idx) => ({ ...acc, [idx]: null }), {})
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set<number>());

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    if (feedback[questionIndex] !== null) return; // Prevent changing answer after submission
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmitAnswer = (questionIndex: number) => {
    const selectedAnswer = selectedAnswers[questionIndex];
    if (selectedAnswer === null || selectedAnswer === undefined) return;

    const isCorrect = selectedAnswer === mockQuestions[questionIndex].correct;

    setFeedback(prev => ({ ...prev, [questionIndex]: isCorrect }));
    setAnsweredQuestions(prev => new Set([...prev, questionIndex]));

    if (isCorrect) setScore(prev => prev + 1);

    if (answeredQuestions.size === mockQuestions.length - 1) {
      setTimeout(() => setShowResult(true), 1500);
    }
  };

  const handleNavigateToQuestion = (index: number) => {
    if (index >= 0 && index < mockQuestions.length) setCurrentQuestion(index);
  };

  const progress = (answeredQuestions.size / mockQuestions.length) * 100;

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Fact-Checking Quiz Challenge
      </Typography>

      {!showResult ? (
        <>
          {/* Progress */}
          <Box sx={{ mb: 4 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 8, borderRadius: 4, backgroundColor: alpha(theme.palette.primary.main, 0.1), '& .MuiLinearProgress-bar': { borderRadius: 4 } }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
              {mockQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "contained" : "outlined"}
                  size="small"
                  onClick={() => handleNavigateToQuestion(index)}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    p: 0,
                    borderRadius: '50%',
                    backgroundColor: feedback[index] !== null
                      ? feedback[index]
                        ? alpha(theme.palette.success.main, 0.1)
                        : alpha(theme.palette.error.main, 0.1)
                      : currentQuestion === index
                        ? theme.palette.primary.main
                        : 'transparent',
                    borderColor: feedback[index] !== null
                      ? feedback[index]
                        ? theme.palette.success.main
                        : theme.palette.error.main
                      : theme.palette.primary.main,
                    color: feedback[index] !== null
                      ? feedback[index]
                        ? theme.palette.success.main
                        : theme.palette.error.main
                      : currentQuestion === index
                        ? 'white'
                        : theme.palette.primary.main,
                  }}
                >
                  {index + 1}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Questions */}
          {mockQuestions.map((question, qIndex) => {
            const isAnswered = feedback[qIndex] !== null;

            return (
              <Card key={qIndex} sx={{ mb: 4, display: qIndex === currentQuestion ? 'block' : 'none' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="subtitle1" color="primary.main" gutterBottom>
                    Question {qIndex + 1} of {mockQuestions.length}
                  </Typography>
                  <Typography variant="h5" gutterBottom>{question.question}</Typography>

                  <Stack spacing={2} sx={{ mb: 3 }}>
                    {question.options.map((option, oIndex) => {
                      const isSelected = selectedAnswers[qIndex] === oIndex;
                      const isCorrect = oIndex === question.correct;
                      const showCorrectAnswer = isAnswered && isCorrect;
                      const isSelectedAndAnswered = isAnswered && isSelected;

                      return (
                        <Button
  key={oIndex}
  fullWidth
  variant={!isAnswered && isSelected ? "contained" : "outlined"}
  onClick={() => handleOptionSelect(qIndex, oIndex)}
  disabled={isAnswered}
  sx={{
    py: 1.5,
    justifyContent: 'flex-start',
    px: 3,
    position: 'relative',
    bgcolor: !isAnswered
      ? (isSelected ? theme.palette.primary.light : 'transparent') 
      : isSelectedAndAnswered && isCorrect
        ? alpha(theme.palette.success.main, 0.1)
        : isSelectedAndAnswered
          ? alpha(theme.palette.error.main, 0.1)
          : showCorrectAnswer
            ? alpha(theme.palette.success.main, 0.05)
            : 'transparent',
    borderColor: !isAnswered
      ? (isSelected ? theme.palette.primary.main : theme.palette.divider)
      : isSelectedAndAnswered && isCorrect
        ? theme.palette.success.main
        : isSelectedAndAnswered
          ? theme.palette.error.main
          : showCorrectAnswer
            ? theme.palette.success.main
            : theme.palette.divider,
    color: !isAnswered
      ? (isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary)
      : isSelectedAndAnswered && isCorrect
        ? theme.palette.success.main
        : isSelectedAndAnswered
          ? theme.palette.error.main
          : showCorrectAnswer
            ? theme.palette.success.main
            : theme.palette.text.primary,
    '&:hover': {
      borderColor: !isAnswered ? theme.palette.primary.main : undefined,
      bgcolor: !isAnswered
        ? alpha(theme.palette.primary.main, 0.12)
        : 'transparent'
    }
  }}
>
  {option}
  {isAnswered && (
    showCorrectAnswer ? (
      <CheckCircleOutline sx={{ position: 'absolute', right: 16, color: theme.palette.success.main }} />
    ) : isSelectedAndAnswered ? (
      <HighlightOff sx={{ position: 'absolute', right: 16, color: theme.palette.error.main }} />
    ) : null
  )}
</Button>


                      );
                    })}
                  </Stack>

                  {isAnswered && (
                    <Alert severity={feedback[qIndex] ? "success" : "error"} sx={{ mb: 3 }}>
                      {feedback[qIndex] ? "Correct! " : "Incorrect. "} {question.explanation}
                    </Alert>
                  )}

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {!isAnswered ? (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleSubmitAnswer(qIndex)}
                        disabled={selectedAnswers[qIndex] === null}
                        sx={{ mt: 2 }}
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleNavigateToQuestion(qIndex + 1)}
                        disabled={qIndex === mockQuestions.length - 1}
                        sx={{ mt: 2 }}
                      >
                        Next Question
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </>
      ) : (
        <Card sx={{ textAlign: 'center', p: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom color="primary">Quiz Complete!</Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>Your Score: {score}/{mockQuestions.length}</Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {score === mockQuestions.length ? "Perfect score! You're a fact-checking expert!" : "Keep practicing to improve your fact-checking skills!"}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowResult(false);
                  setSelectedAnswers(mockQuestions.reduce((acc, _, idx) => ({ ...acc, [idx]: null }), {}));
                  setFeedback(mockQuestions.reduce((acc, _, idx) => ({ ...acc, [idx]: null }), {}));
                  setAnsweredQuestions(new Set());
                }}
              >
                Try Again
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/leaderboard')}
              >
                Leaderboard
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default QuizGame;
