import { AxiosError } from 'axios';
import { getWaitingRoomAgentWithAuth, waitingRoomAgent } from '../agents/waiting-room-agent';

// Method to assign a queue number
export const postAssignQueueNumber = async (eventId: string): Promise<TODO> => {
  const agent = await getWaitingRoomAgentWithAuth();
  const response = await agent.post('/assign_queue_num', {
    event_id: eventId,
  });
  return response.data;
};

// Method to get the serving number
export const getServingNumber = async (eventId: string): Promise<TODO> => {
  const agent = await getWaitingRoomAgentWithAuth();
  const response = await agent.get('/serving_num', {
    params: { event_id: eventId },
  });
  return response.data;
};

// Method to get the waiting number
export const getWaitingNumber = async (eventId: string): Promise<TODO> => {
  const agent = await getWaitingRoomAgentWithAuth();
  const response = await agent.get('/waiting_num', {
    params: { event_id: eventId },
  });
  return response.data;
};

// Method to get the queue number
export const getQueueNumber = async (eventId: string, requestId: string): Promise<TODO> => {
  const agent = await getWaitingRoomAgentWithAuth();
  const response = await agent.get('/queue_num', {
    params: { event_id: eventId, request_id: requestId },
  });
  return response.data;
};

// Method to generate a token
export const postGenerateToken = async (eventId: string, requestId: string): Promise<TODO> => {
  const agent = await getWaitingRoomAgentWithAuth();
  try {
    const response = await agent.post('/generate_token', {
      event_id: eventId,
      request_id: requestId,
    });

    const data = response.data;
    if (data.error) {
      throw new Error(data.error);
    }
    if (data.expires_in === 0) {
      throw QUEUE_POSITION_EXPIRED_ERROR;
    }
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.error === QUEUE_POSITION_EXPIRED_ERROR) {
        throw QUEUE_POSITION_EXPIRED_ERROR;
      }
    }
    throw error;
  }
};

export const QUEUE_POSITION_EXPIRED_ERROR = 'Queue position has expired';

export const getQueuePositionExpiry = async (eventId: string, requestId: string): Promise<TODO> => {
  try {
    const agent = await getWaitingRoomAgentWithAuth();
    const response = await agent.get('/queue_pos_expiry', {
      params: { event_id: eventId, request_id: requestId },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.error === QUEUE_POSITION_EXPIRED_ERROR) {
        throw QUEUE_POSITION_EXPIRED_ERROR;
      }
    }
    throw error;
  }
};
