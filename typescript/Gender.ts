export type Gender = (
  Gender.MALE |
  Gender.FEMALE
)

export namespace Gender {
  /**
  *
  */
  export type MALE = 0

  /**
  *
  */
  export const MALE: MALE = 0

  /**
  *
  */
  export type FEMALE = 1

  /**
  *
  */
  export const FEMALE: FEMALE = 1

  /**
  *
  */
  export const DEFAULT: Gender = 0

  /**
  *
  */
  export const ALL: Gender[] = [
    MALE,
    FEMALE
  ]

  /***
  *
  */
  export function toString(gender: Gender): string | undefined {
    switch (gender) {
      case MALE: return 'MALE'
      case FEMALE: return 'FEMALE'
      default: return undefined
    }
  }

  /**
  *
  */
  export function toDebugString(gender: Gender): string {
    return 'Gender ' + gender + ' (' + (toString(gender) || 'undefined') + ')'
  }
}
