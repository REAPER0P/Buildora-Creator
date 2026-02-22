import { Project, File } from '../types';
import { templates } from './templates';

const STORAGE_KEY = 'buildora_projects';

export const getProjects = (): Project[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse projects from storage", e);
    return [];
  }
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const saveProject = (project: Project) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  if (index !== -1) {
    projects[index] = project;
  } else {
    projects.push(project);
  }
  saveProjects(projects);
};

export const deleteProject = (id: string) => {
  const projects = getProjects().filter(p => p.id !== id);
  saveProjects(projects);
};

export const duplicateProject = (id: string): Project | null => {
  const projects = getProjects();
  const original = projects.find(p => p.id === id);
  
  if (!original) return null;

  // Deep copy the project
  const newProject: Project = JSON.parse(JSON.stringify(original));
  
  // Update unique identifiers
  newProject.id = Date.now().toString();
  newProject.name = `${original.name} Copy`;
  newProject.lastModified = Date.now();
  
  // Regenerate file IDs to ensure uniqueness
  newProject.files = newProject.files.map(f => ({
    ...f,
    id: Date.now().toString() + Math.random().toString().slice(2)
  }));

  projects.unshift(newProject);
  saveProjects(projects);
  
  return newProject;
};

export const createProject = (name: string, type: 'html' | 'php'): Project => {
  // Select template based on type
  // In a future update, we could pass a templateId directly
  const templateId = type === 'php' ? 'php-basic' : 'modern-landing';
  const template = templates[templateId];

  if (!template) {
      throw new Error(`Template not found for type: ${type}`);
  }

  const templateFiles = template.files(name);
  
  // Convert template files to Project Files with IDs
  const files: File[] = templateFiles.map((tf, index) => ({
      ...tf,
      id: Date.now().toString() + index,
      parentId: 'root',
      isDirectory: false
  }));

  return {
    id: Date.now().toString(),
    name,
    type,
    lastModified: Date.now(),
    files
  };
};