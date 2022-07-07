export interface SegmentAttr {
  title: string;
  name: string | number;
  icon?: SegmentIcon;
}

export interface SegmentIcon {
  color?: string;
  name: string;
  darkThemeColor?: string;
  size?: string | number;
}

export interface ActiveVal {
  value: string | number | undefined;
}
