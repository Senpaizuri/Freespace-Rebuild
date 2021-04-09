export const state = ()=>({
    lightMode: true
})

export const getters = {
    getLightMode: state => state.lightMode
}

export const mutations = {
    setLightMode(state,payload){
        state.lightMode = payload
    }
}