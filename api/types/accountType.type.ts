export interface AccountTypeData {
  key: AccountTypeKey;
  name: string;
  description: string;
  icon?: string | null;
  color?: string | null;
}

export type AccountTypeKey =
  | "primigenius"
  | "silent_river"
  | "mimir_well"
  | "inclement_reflection"
  | "sealed_runes"
  | "wandering_shadow";