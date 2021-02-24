import type {MutationTree} from 'vuex';
import type {State}        from './store';
import {Mutations, MutationTypes}    from './mutationTypes';

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.INC_COUNTER](state: State, payload: {amount: number}){
        state.count += payload.amount;
    },
};
