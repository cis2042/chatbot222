
export enum AppMode {
  Chat = 'chat',
  Garden = 'garden',
}

export enum ChatRole {
  User = 'user',
  Model = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
}
