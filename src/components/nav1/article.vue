<template>
    <section>
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
					<el-input  v-model="input" placeholder="行一度空山"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="query">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add">新增</el-button>
				</el-form-item>
            </el-form>
        </el-col>
        <el-table :data="articleList" style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="img" label="文章附图"></el-table-column>
            <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="center" @current-change="handleCurrentChange" :current-page="1" :page-size="10" layout=" prev, pager, next" :total="totalArticle"></el-pagination>
    </el-row>
    </section>    
</template>

<script>
	import Bmob from '../../api/api';
    export default{
        data(){
            return {
                input: '',
                articleList:[],
                totalArticle:0,
            }
        },
        methods:{
            query(){

            },
            add(){

            },
            edit(index,row){
                this.$router.push({
                    path: 'articlePicture', 
                    name: '文章新增/编辑',
                    params: { 
                        dataObj: this.articleList[index]
                    }
                })
            },
            del(index,row){
                Bmob.delArticle(this.articleList[index].objectId)
                .then(res => {
                    this.$message('删除{'+this.articleList[index].title+'}成功!');
                    this.articleList.splice(index,1);
                }).catch(err => {
                    console.log(err)
                })
            },      
            handleCurrentChange(val) {
                Bmob.queryArticleByPage(val)
                .then((res)=>{
                    this.articleList = res;
                })
                .catch((err)=>{
                    console.log(err);
                });
                Bmob.countArticles()
                .then((res)=>{
                    this.totalArticle = res;
                })
                .catch((err)=>{
                    console.log(err);
                });
            },
            confirmEdit(){

            },
            confirmAdd(){

            }
        },
        mounted(){
            this.handleCurrentChange(1);
        }
    } 


</script>

<style>
.center{
    margin-top:30px;
    text-align:center;
}
</style>
