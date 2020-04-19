import { SubmissionError } from "redux-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function submit(values) {
  console.log("called");
  return sleep(1000).then(() => {
    // simulate server latency
    if (!("homeScorer" in values)) {
      console.log("error homeScorer");
      throw new SubmissionError({
        homeScorer: "Choose home scorer",
        _error: "Submit failed - Choose home team scorer",
      });
    } else if (!("awayScorer" in values)) {
      throw new SubmissionError({
        awayScorer: "Choose away scorer",
        _error: "Submit failed - Choose away team scorer",
      });
    } else if (!("winner" in values)) {
      throw new SubmissionError({
        winner: "Choose winner",
        _error: "Submit failed - Choose winner",
      });
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }
  });
}

export default submit;
