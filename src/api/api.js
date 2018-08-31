var Bmob = require('hydrogen-js-sdk/src/lib/app.js');
const BMOB_ID = "818f8d7565f7588990922e937dd3e7c8";
const BMOB_APPKEY = "baeecb59d59023ea9a71db006def599a";

//初始化BMOB
Bmob.initialize(BMOB_ID, BMOB_APPKEY);

let BmobInstance = {};

BmobInstance.instance = Bmob;

//登录操作
BmobInstance.login = function(username,password){
    return Bmob.User.login(username,password);
}


//评论相关api
//获取评论
BmobInstance.getCommentsByPage = function(page){
    const query = Bmob.Query("comments");
    query.include('own','articleId')
    query.order("-updatedAt");
    query.limit(10);
    query.skip(10*(page-1));
    return query.find();
}
//统计评论总条数
BmobInstance.countComments = function(){
    const query = Bmob.Query('comments');
    return query.count();
}
//增加评论
BmobInstance.addComments = function(comment){
    const query = Bmob.Query("comments");
    query.set("content",comment.content);
    const pointer = Bmob.Pointer('Articles');
    const poiID = pointer.set(comment.objectId);
    query.set("articleId",poiID);
    return query.save();
}
//删除评论
BmobInstance.delComments = function(objectId){
    const query = Bmob.Query("comments");
    return query.destroy(objectId);
}



BmobInstance.queryArticleByPage = function(page){
    const query = Bmob.Query("Articles");
    query.order("-updatedAt");
    query.limit(10);
    query.skip(10*(page-1));
    return query.find();
}
BmobInstance.countArticles = function(){
    const query = Bmob.Query('Articles');
    return query.count();
}
BmobInstance.addArticle = function(article){
    const query = Bmob.Query('Articles');
    query.set("title",article.title);
    //增加权限，只有一个账号拥有写权限
    query.set('ACL',{"*":{"read":true},"lCSZ4447":{"read":true,"write":true}});
    query.set("img",article.img_url);
    query.set("author",article.author);
    query.set("content",article.content);
    return query.save();
}
BmobInstance.changeArticle = function(objectId,article){
    const query = Bmob.Query('Articles');
    query.set('id', objectId) //需要修改的objectId
    query.set("title",article.title);
    query.set("img",article.img_url);
    query.set("author",article.author);
    query.set("content",article.content);
    return query.save();
}

BmobInstance.delArticle = function(objectId){
    const query = Bmob.Query('Articles');
    return query.destroy(objectId);
}

BmobInstance.saveFile = function(files){
    let file;
    for(let item of files){
        file = Bmob.File(item.name, item);
    }
    return file.save();
}
export default BmobInstance;