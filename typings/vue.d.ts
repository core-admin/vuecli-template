import type { VNodeChild, PropType as VuePropType } from 'vue';

declare global {
  interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
  }

  type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type PropType<T> = VuePropType<T>;

  type VueNode = VNodeChild | JSX.Element;

  type SFCWithInstall<T> = T & Plugin;

  type EmitType = (event: string, ...args: any[]) => void;

  type StyleValue = string | CSSProperties | Array<StyleValue>;
}
