export interface InterviewRequest {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  status: 'pending' | 'accepted';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface FormData {
  name: string;
  email: string;
  jobTitle: string;
}

export interface SocketEvents {
  newInterviewRequest: {
    type: 'NEW_REQUEST';
    data: InterviewRequest;
  };
  requestStatusUpdate: {
    type: 'STATUS_UPDATE';
    data: InterviewRequest;
  };
  requestDeleted: {
    type: 'REQUEST_DELETED';
    data: { id: string };
  };
}

export type FilterStatus = 'all' | 'pending' | 'accepted';

export interface LoadingState {
  submit: boolean;
  accept: string | null; // ID of the request being accepted
  fetch: boolean;
}