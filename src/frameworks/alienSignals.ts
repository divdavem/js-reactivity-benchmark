import {
  computed,
  Dependency,
  effect,
  signal,
  System,
} from "alien-signals";
import { ReactiveFramework } from "../util/reactiveFramework";

const useStrictPropagation = false;

if (useStrictPropagation) {
  Dependency.setPropagationMode('strict');
}

export const alienFramework: ReactiveFramework = {
  name: "alien-signals",
  signal: (initial) => {
    const data = signal(initial);
    return {
      read: () => data.get(),
      write: (v) => data.set(v),
    };
  },
  computed: (fn) => {
    const c = computed(fn);
    return {
      read: () => c.get(),
    };
  },
  effect: (fn) => effect(fn),
  withBatch: (fn) => {
    System.startBatch();
    fn();
    System.endBatch();
  },
  withBuild: (fn) => fn(),
};
