import { Log } from "@/models/logs.model";


interface LogsEntryParams {
  userId: string;
  email: string;
  action: string;
  ipAddress: string;
  requestMethod: string;
  endPoint: string;
  status: number;
  userAgent: string;
}

export const logsEntry = async (
  {userId,
  email,
  action,
  ipAddress,
  requestMethod,
  endPoint,
  status,
  userAgent}:LogsEntryParams
):Promise<void> => {
  await Log.create({
    userId: userId,
    email: email,
    action: action,
    ipAddress: ipAddress,
    requestMethod: requestMethod,
    endPoint: endPoint,
    status: status,
    userAgent: userAgent,
  });
};