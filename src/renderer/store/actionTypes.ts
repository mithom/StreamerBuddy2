import type {ActionContext} from 'vuex';
import type {State}         from './store';
import type {Mutations}     from './mutationTypes';

export enum ActionTypes {
    INC_COUNTER= 'INC_COUNTER',
}

export interface Actions {
    [ActionTypes.INC_COUNTER](
        {commit}: AugmentedActionContext,
        payload: number
    ): void
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ):ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

