export function validateQuestionInput({ ques, questionType, options, answer, explanations, explain }) {
    if (ques.trim() === "") return "Câu hỏi không được để trống";
    if (questionType !== "Part_3" && Object.keys(options).length < 4) return "Bạn cần nhập các lựa chọn";
  
    if (questionType === "Part_2") {
      if (Object.keys(explanations).length < 4) return "Bạn cần nhập giải thích cho từng phần";
      if (Object.keys(answer).length < 4) return "Bạn cần chọn đáp án cho từng phần";
    }
  
    if (questionType === "Part_3" && Object.keys(answer).length === 0)
      return "Bạn nhập chọn đáp án đúng";
  
    if (questionType === "Part_1" && Object.keys(answer).length === 0)
      return "Bạn cần chọn đáp án đúng";
  
    if (questionType !== "Part_2" && explain.trim() === "")
      return "Bạn cần nhập giải thích";
  
    return null;
  }
  