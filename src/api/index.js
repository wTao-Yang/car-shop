import axios from 'axios';
const baseURL='http://localhost:3000';

function getData(url,method='post'){
	return async(data,callback) => {
		if(method === "post"){
			axios.post(baseURL+url,data).then(result => {
        // result&&result.code == SUCCESS_CODE?callback&&callback(result.data):flag?_.alert('提示',result.desc):'';
        result?callback(result.data):'';
			}).catch(err=>{
			});
		}else{
			axios.get(baseURL+url,{params:data}).then(result =>{
        // result&&result.code == SUCCESS_CODE?callback&&callback(result.data):flag?_.alert('提示',result.desc):'';
        result?callback(result.data):_.alert('提示',result.desc);
			}).catch(err=>{
			});
		}
	}
};

const login=getData('/login');

const register=getData('/register');

const carList=getData('/cars/carList');

const isCollect=getData('/cars/isCollect');

const getHot=getData('/cars/getHot');

const getBrand=getData('/cars/getBrand');

const getCarDetail=getData('/cars/carDetail');

const clickNum=getData('/cars/updateClickNum');

const collect=getData('/self/collect');

const getInfo=getData('/self/baseInfo');

const updateHeadPic=getData('/self/updateHeadPic');

const getCollection=getData('/self/collection');

const getMySold=getData('/self/mySold');

const setSuggest=getData('/self/setSuggest');

const setInfo=getData('/self/setInfo');


export{
  login,
  register,
  carList,
  getCarDetail,
  collect,
  getInfo,
  updateHeadPic,
  getCollection,
  isCollect,
  getMySold,
  setSuggest,
  setInfo,
  getBrand,
  clickNum,
  getHot
}