
export interface Scene {
  description: string;
  camera_angle: string;
  lighting: string;
  duration_seconds: number;
}

export interface VideoPromptJson {
  title: string;
  style: string;
  scenes: Scene[];
}

export interface GeneratedPrompts {
  prompt_pt: string;
  prompt_en: string;
  prompt_json: VideoPromptJson;
}
