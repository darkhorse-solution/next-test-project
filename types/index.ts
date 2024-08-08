import { IUser } from "@/models/User";
import { NextRequest } from "next/server";

export interface AuthenticatedRequest extends NextRequest {
  user?: IUser;
}