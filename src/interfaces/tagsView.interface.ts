export type TagItem = {
  code: string;
  label: string;
  path: string;
  closable: boolean;
}

export interface TagsViewState {
  tags: TagItem[];
  activeTagId: TagItem['path'];
}