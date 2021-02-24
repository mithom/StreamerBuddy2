import type {State} from './store';

export enum MutationTypes {
    INC_COUNTER = 'INC_COUNTER',
}

export type Mutations<S = State> = {
    [MutationTypes.INC_COUNTER](state: S, payload: { amount: number }): void
}
