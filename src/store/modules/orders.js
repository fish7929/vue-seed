import {
    SAVE_ORDERRECORDS,
    RESET_ORDERRECORDS
} from 'Store/mutation-types.js';
import {
    getOrderRecords
} from 'Api/httpApi'
const state = {
    currentPage: 1, //起始页码下标
    pageLength: 5, //每次加载10条
    isFinish: false,  //是否完成
    records: null,   //显示的条目
}

const actions = {
    async getRecordsByPage({ commit, state }, payload) {
        let res = await getOrderRecords(payload);
        console.log(res, 'getOrderRecords');
        if (res && res.code === 200) {
            const info = res.data || {};
            const { list } = info;
            const len = list.length;
            let isFinish = len < state.pageLength ? true : false;  //是否完成  
            const paylod = {
                records: list,
                isFinish
            };
            commit(SAVE_ORDERRECORDS, paylod)
        }
    }
}

const mutations = {
    //保存商品信息
    [SAVE_ORDERRECORDS](state, { isFinish, records }) {
        state.records = state.records ? [...state.records, ...records] : records;
        state.isFinish = isFinish;
    },
    [RESET_ORDERRECORDS](state) {
        state = {
            currentPage: 1, //起始页码下标
            pageLength: 5, //每次加载10条
            isFinish: false,  //是否完成
            records: null,   //显示的条目
        };
    }
}

export default {
    namespaced: true,  //利用命名空间
    state,
    actions,
    mutations
}