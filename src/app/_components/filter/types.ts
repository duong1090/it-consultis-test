export interface FilterProps<T> {
  label: string;
  data: T[];
  contentIndex: keyof T;
  keyIndex: keyof T;
  selected: T[];
  onChange: (item: T) => void;
}
