import api from "./axios";

// ---------------- Auth ----------------
export const registerUser = (data: any) =>
  api.post("/auth/register", data);

export const loginUser = (data: any) =>
  api.post("/auth/login", data);


// ---------------- Assessments ----------------
export const createAssessment = (file: File|null, teacherId: number, title: string, description: string, passPercent: number) => {
  const formData = new FormData();
  formData.append("file", file||'');                 // File from input
  formData.append("teacher_id", teacherId.toString());
  formData.append("title", title);
  formData.append("description", description);
  formData.append("pass_percent", passPercent.toString());

  return api.post("/question", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const checkStatus =(id:number)=>{
  // http://localhost:3000/api/question/8/status
  return api.get(`/question/${id}/status`);
}
export const updateAssessmentStatus = (assessmentCode: string,status:string) =>                    
  api.put(`/assessment/${assessmentCode}/status`,{
    status
  });   //Please create this api in backend
export const getAssessmentList = ({
  search = "",
  sort = "new",
  page = 1,
  limit = 10,
} = {}) => {
  return api.get("/assessment/", {
    params: {
      search,
      sort,
      page,
      limit,
    },
  });
};


export const publishAssessment = (id: string) =>
  api.get(`/assessment/${id}`);

// ---------------- Students ----------------
export const getTest = (assessmentId: string) =>
  api.get(`/test/${assessmentId}`);

export const submitTest = (payload: any) =>
  api.post("/test/submit", payload);
