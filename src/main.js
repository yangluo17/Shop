// 入口文件
import Vue from 'vue'
//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)


// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本地存储中，把购物车数据读取出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: { //this.$store.state.***
        car: car
    },
    mutations: { //this.$store.commit('方法的名称'，'按需传递唯一的参数')
        addToCar(state, goodsinfo) {
            //点击加入购物车，把商品信息保存到store的car上
            //分析
            //1.如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
            //2.如果没有，则直接把商品数据push到car中即可

            //假设在购物车中没有找到对应的商品
            var flag = false

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    return true
                }
            })

            // 如果最终循环完毕，得到的flag还是false，则把商品数据直接push到购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }

            //当更新car之后，把car数组存储到本地 的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            //修改购物车中商品的数量值
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品的数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            //根据ID，从store中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            // 将删除完毕后的最新的购物车数据，保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id === info.id) {
                    item.selected = info.selected
                }
            })
            // 将最新的所有购物车选中状态，保存到store中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { //this.$store.getters.*** 
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, //勾选的数量
                amount: 0 //勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

//导入时间格式
import moment from 'moment';
//定义全局过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})
// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置post时候的表单数据格式组织形式 application/x-www-form unlencoded
Vue.http.options.emulateJSON = true

//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
/* import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

Vue.use(Lazyload); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)


// 导入自己的router.js路由模块
import router from './router.js'

// 导入App 根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, //挂载路由对象到实例上
    store //挂载状态管理
})