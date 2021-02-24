import { InjectionKey }                        from 'vue';
import {createStore, useStore as baseUseStore} from 'vuex';
import type {Store}                            from '/@/types/shims-vuex';
import {mutations}                             from '/@/store/mutations';
import {actions}                               from '/@/store/actions';
import {getters}                               from '/@/store/getters';
import {MutationTypes}                         from '/@/store/mutationTypes';
import {ActionTypes}                           from '/@/store/actionTypes';

export {MutationTypes, ActionTypes};

export const key: InjectionKey<Store> = Symbol();

// declare your own store states
export type State = {
    count: number
}

const state: State = {
    count: 1,
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
