const state = () => ({position: {}})//声名一个状态，position用来保存位置的
//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
//let getTempItem = id => ({ id: id, name: "Temp" });

const mutations = {//创建一个提交
  setPosition(state, val) {
    state.position = val
  }
}

const actions = {//响应这个提交
  setPosition: ({commit}, position) => {
    commit('setPosition', position)  //'setPosition'对应的是mutations里的setPosition()方法
  }
}

export default {namespaced: true, state, mutations, actions}
//vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名