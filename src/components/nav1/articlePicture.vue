<template>
    <section>
        <el-col :span='10'  v-loading="loading">
            <div class="titleTab">
                新增文章/编辑文章            
            </div>
            <el-form :model="nowarticle" label-position="right" :rules="rules" label-width="120px" >
                <el-form-item label="标题：" size="mini" prop="title">
                    <el-input v-model="nowarticle.title" ></el-input>
                </el-form-item>
                <el-form-item label="作者：" prop="author">
                    <el-input v-model="nowarticle.author"></el-input>
                </el-form-item>
                <el-form-item label="文章附图：" prop="img_url">
                    <el-input v-model="nowarticle.img_url"></el-input>
                    <input ref="selectfile" type="file" id="profilePhotoFileUpload"  accept="image/*" @change="selectFile">
                </el-form-item>
                <el-form-item label="内容：" prop="content">
                    <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 30}" v-model="nowarticle.content"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button  type="primary" @click="submit">{{btnMsg}}</el-button> 
                </el-form-item>
            </el-form>
            
        </el-col>
        <el-col :span='14'>
            <div class="container" v-bind:style="{ backgroundImage: bgUrl}">
                <div class="article_show">
                <h1 class="aricle_title">{{nowarticle.title}}</h1>
                <div class="aricle_author">{{nowarticle.author}}</div>
                <div class="article_content" v-html="testContent">
                </div>
                </div>
            </div>
        </el-col>      
    </section>    
</template>

<script>
	import Bmob from '../../api/api';
    export default{
        data(){
            return{
                pictureList:[],
                pagesize:20,
                totalPicture:0,
                auth:{},
                loading:false,
                loadingInstance:{},
                nowarticle:{
                    title:'',
                    author:'',
                    img_url:'',
                    content:''
                },
                btnMsg:'确认修改',
                showData:{},
                rules: {
                    title: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入文章作者', trigger: 'blur' }
                    ],
                    img_url: [
                        { required: true, message: '请输入图片或上传', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入文章内容', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submit(){
                this.loading = true;
                if(this.nowarticle.objectId){
                    Bmob.changeArticle(this.nowarticle.objectId,this.nowarticle)
                    .then(res=>{
                        this.loading = false;
                        this.$message('修改成功！'); 
                        this.nowarticle = {};                   
                        console.log(res);
                    })
                    .catch(err=>{
                        this.loading = false;
                        console.log(err);
                    });
                }else{
                    Bmob.addArticle(this.nowarticle)
                    .then(res=>{
                        this.loading = false;
                        this.nowarticle = {};
                        this.$message('添加成功！');                    
                        console.log(res);
                    }).catch(err=>{
                        this.loading = false;                    
                        console.log(err);
                    });
                }

            },
            selectFile(){
                const pic = this.$refs.selectfile.files
                //todo 统一文件名规范
                this.loading = true;
                Bmob.saveFile(pic)
                .then(res=>{
                    this.loading = false;
                    this.nowarticle.img_url = res[0].url;
                })
                .catch(err=>{
                    console.log(err);
                    this.loading = false;
                });
            }
        },
        mounted(){
            let routerParams = this.$route.params.dataObj;
            if(routerParams){
                this.btnMsg = '确认修改';
                // 将数据放在当前组件的数据内
                this.nowarticle.title = routerParams.title;
                this.nowarticle.author = routerParams.author;
                this.nowarticle.content = routerParams.content;
                this.nowarticle.img_url = routerParams.img;
                this.nowarticle.objectId = routerParams.objectId;
            }else{
                this.btnMsg = '确认提交';
            }
        },
        computed:{
            bgUrl(){
                return 'url('+this.nowarticle.img_url+')';
            },
            testContent(){
                if(this.nowarticle.content){
                    let temp = this.nowarticle.content;
                    temp = temp.replace(/\n/g,'</p><p>');
                    temp = '<p>'+temp+'</p>';
                    return temp;
                }else{
                    return '';
                }
            }
        }
    }
    
</script>

<style scoped>
.titleTab{
    height:30px;
    font-size:20px;
    margin:20px 0;
    text-align:center;
}
.center{
    margin-top:30px;
    text-align:center;
}
.container{
	padding:40px 8px;
	width: 90%;
	margin: 0px auto;
	background-size: cover;
    background-repeat: no-repeat;
	border-radius: 5px;
}
.container .article_show{
	padding: 20px;
	width: 80%;
    margin: 0 auto;
    background-color: #fff;
	border: 1px dashed #dddddd;

}


.container .article_show .aricle_title{
	text-align: center;
    color: #000000;
    font-weight: normal;
    letter-spacing: 4px;	
    
}
.container .article_show .aricle_author{
	text-align: center;
	color: #999999;
	line-height: 30px;
	font-size: 16px;
	margin: 0;
}
.container .article_show .article_content /deep/ p{
    color: #000;
    font-size: 16px;
    font-weight: normal;
    line-height: 30px;
    margin-bottom: 30px;
    text-align: justify;	
}
</style>