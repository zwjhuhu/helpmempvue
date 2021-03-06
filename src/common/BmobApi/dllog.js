/*
 作者: chenghao
 功能: js脚本
 */

//  引入
import Bmob from "hydrogen-js-sdk";

//表名称
import { DlLogTable } from '@/common/constant.js';

/**
 * 添加日志数据
 * @param dllog
 * @returns {Promise<any>}
 */
export function adddllog ( dllog ) {

  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlLogTable );
    //这里 设置  列的数据

    query.set( "logruntype" , dllog.logruntype )
    query.set( "userid" , dllog.userid )
    query.set( "username" , dllog.username )
    query.set( "productno" , dllog.productno )
    query.set( "dates" , dllog.dates )
    query.set( "comment" , dllog.comment )

    query.save().then( res => {
      //console.log( res )

      resolve( res );
      //返回创建时间和id
      // {
      //     createdAt: "YYYY-mm-dd HH:ii:ss",
      //         objectId: "objectId"
      // }
    } ).catch( err => {
      //console.log( err )

      resolve( null );
    } )
  } );
}

//由工程单号查询列表
export function getloglistbyproductno ( productno ) {
  const query = Bmob.Query( DlLogTable );

  query.equalTo( "productno" , "==" , productno );

  query.order( "autokey" );

  return query.find();
}

/**
 * 由工程单号删除
 * @param productno
 * @returns {Promise<any>}
 */
export function deletebyproductno ( productno ) {
  return new Promise( ( resolve , reject ) => {
    const query = Bmob.Query( DlLogTable );
    query.equalTo( "productno" , "==" , productno );

    query.find().then( res => {
      //返回的是数组,没有找到就是空数组

      res.destroyAll().then( todos => {
        // 成功批量修改
        // todos  返回的数组
        // "success": { "msg": "ok"      }
        // console.log( todos )
        resolve( true );
      } ).catch( errs => {
        // console.log( errs )
        resolve( false );
      } );
    } );

  } );
}
