export interface Summary {
  id: string;
  user_id: string;
  original_file_url: string;
  summary_text: string;
  status: string;
  title: string | null;
  file_name: string | null;
  created_at: string;
  updated_at: string;
}
