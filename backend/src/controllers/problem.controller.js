export const getAllProblems = (req, res) => {
  res.send('Get all problems');
};

export const getProblemById = (req, res) => {
  res.send(`Get problem with ID: ${req.params.problemId}`);
};

export const submitSolution = (req, res) => {
  res.send(`Submit solution for problem ID: ${req.params.problemId}`);
};

export const getMySubmissionsForProblem = (req, res) => {
  res.send(`Get my submissions for problem ID: ${req.params.problemId}`);
};

export const createProblem = (req, res) => {
  res.send('Create a new problem');
};

export const updateProblem = (req, res) => {
  res.send(`Update problem with ID: ${req.params.problemId}`);
};

export const deleteProblem = (req, res) => {
  res.send(`Delete problem with ID: ${req.params.problemId}`);
};