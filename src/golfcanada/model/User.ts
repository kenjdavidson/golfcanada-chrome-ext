export interface User {
  id: number;
  authUserId: number;
  networkId: number;
  golfCanadaCardId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  membershipLevel: string;
  scoringDefaults: ScoringDefaults;
}

export interface ScoringDefaults {
  nationalAssociation: string;
  facilityId: number;
  facilityName: string;
  courseId: number;
  teeId: number;
  postHoldByHole: boolean;
}

export interface Club {
  name: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  phone: string;
  url: string;
  logo: string;
}

export interface Profile {
  individualId: number;
  cardId: string;
  name: string;
  handicap: string;
  level: string;
  city: string;
  region: string;
  club: Club;
  email: string;
  expirationDate: Date;
  displayLowHandicap: string;
}