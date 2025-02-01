import type { StoreCompleteCartRes } from '@medusajs/medusa';
import axios from 'axios';

export const putS3ObjectUsingPresignedUrl = async (params: {
  uploadUrl: string;
  base64Data: string;
  type: string;
}): Promise<StoreCompleteCartRes> => {
  const { uploadUrl, base64Data, type } = params;

  const res = await axios.put(uploadUrl, Buffer.from(base64Data, 'base64'), {
    headers: {
      'Content-Type': type,
    },
  });

  return res.data;
};
