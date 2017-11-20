export interface ISocial {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface IProfile {
  email: string;
  name: string;
  photo: string;
  location?: string;
  social?: ISocial;
  about?: string;
  mentor?: boolean;
  organizer?: boolean;
  speaker?: boolean;
  topics?: string[];
  $key?: string;
}


export interface IProfileUpdate {
  location?: string;
  social?: ISocial;
  about?: string;
  topics?: string[];
}
