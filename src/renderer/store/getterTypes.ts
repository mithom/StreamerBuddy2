import type {State} from './store';

export type Getters = {
    counter(state: State): number;
}
