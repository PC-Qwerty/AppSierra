import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { User, Project, Task } from "../types";

// Auth atoms
export const userAtom = atomWithStorage<User | null>("userToken", null);
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<string>("");

// Project atoms
export const projectsAtom = atom<Project[]>([]);
export const activeProjectAtom = atom<Project | null>(null);
export const projectLoadingAtom = atom<boolean>(false);
export const projectErrorAtom = atom<string>("");

// Task atoms
export const tasksAtom = atom<Task[]>([]);
export const taskLoadingAtom = atom<boolean>(false);
export const taskErrorAtom = atom<string>("");
