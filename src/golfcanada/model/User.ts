export class User {
  id?: number;
  authUserId?: number;
  networkId?: number;
  golfCanadaCardId?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  membershipLevel?: string;
  scoringDefaults?: ScoringDefaults;
}

export class ScoringDefaults {
  nationalAssociation?: string;
  facilityId?: number;
  facilityName?: string;
  courseId?: number;
  teeId?: number;
  postHoldByHole = true;
}
