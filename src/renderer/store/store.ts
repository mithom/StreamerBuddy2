import { InjectionKey } from 'vue';
import {ActionContext, ActionTree, createStore, GetterTree, MutationTree, useStore as baseUseStore} from 'vuex';
import type {Store} from '/@/types/shims-vuex';

export const key: InjectionKey<Store> = Symbol();

// declare your own store states
export type State = {
    count: number
}

const state: State = {
    count: 1,
};

export enum MutationTypes {
    INC_COUNTER = 'INC_COUNTER',
}

export enum ActionTypes {
    INC_COUNTER= 'INC_COUNTER',
}

export type Mutations<S = State> = {
    [MutationTypes.INC_COUNTER](state: S, payload: { amount: number }): void
}

const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.INC_COUNTER](state: State, payload: {amount: number}){
        state.count += payload.amount;
    },
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
  ):ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
    [ActionTypes.INC_COUNTER](
        {commit}: AugmentedActionContext,
        payload: number
    ): void
}

export const actions: ActionTree<State, State> & Actions = {
    [ActionTypes.INC_COUNTER]({commit}){
        commit(MutationTypes.INC_COUNTER, {amount: 1});
    },
};

export type Getters = {
    counter(state: State): number;
}

export const getters: GetterTree<State, State> & Getters = {
    counter: state => {
        return state.count;
    },
};

export const store = createStore<State>({
    state,
    mutations,
    actions,
    getters,
});

export function useStore(): Store{
    return baseUseStore(key) as Store;
}
