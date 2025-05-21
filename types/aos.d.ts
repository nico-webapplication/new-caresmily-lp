declare module 'aos' {
  interface AosOptions {
    // Core options
    disable?: boolean | string | (() => boolean);
    startEvent?: string;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    
    // Settings that can be overridden on per-element basis
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  interface AOS {
    init(options?: AosOptions): void;
    refresh(initialize?: boolean): void;
    refreshHard(): void;
  }

  const aos: AOS;
  export default aos;
}