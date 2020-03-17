/**
 * @component GlobalVar.js
 * @description 全局变量的定义。
 * @time 2017-04-10 10:20
 * @author fishYu
 **/
import CommonTool from "./commonTool";
import HttpUtil from './httpUtil';
import ApiPath from '../config/apiPath';
//定义全局属性
Object.defineProperties((window || global), {
    ApiPath: {
        get() {
            return ApiPath;
        }
    },
    CommonTool: {
        get() {
            return CommonTool;
        }
    },
    HttpUtil: {
        get() {
            return HttpUtil;
        }
    }
});