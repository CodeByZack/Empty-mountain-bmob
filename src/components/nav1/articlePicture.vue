<template>
    <section>
        <el-col :span='12'  v-loading="loading">
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
        <el-col :span='12'>
            <div class="titleTab">
                预览文章            
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
                this.loading = true;
                Bmob.saveFile(pic)
                .then(res=>{
                    console.log(res);
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
            let routerParams = this.$route.params.dataObj
            if(routerParams){
                this.btnMsg = '确认修改';
            }
            // 将数据放在当前组件的数据内
            this.nowarticle.title = routerParams.title;
            this.nowarticle.author = routerParams.author;
            this.nowarticle.content = routerParams.content;
            this.nowarticle.img_url = routerParams.img;
            this.nowarticle.objectId = routerParams.objectId;
        }
    }
    
</script>

<style>
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
</style>