import { http } from "./http";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export async function register(payload: RegisterRequest) {
  const res = await http.post<AuthResponse>("/auth/register", payload);
  return res.data; // { token }
}

export async function login(payload: LoginRequest) {
  const res = await http.post<AuthResponse>("/auth/login", payload);
  return res.data; // { token }
}
