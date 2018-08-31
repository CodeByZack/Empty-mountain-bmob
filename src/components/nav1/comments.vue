<template>
    <section>
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-button disabled plain>所有评论</el-button>
                <el-form-item>
					<el-input  v-model="input" placeholder="行一度空山"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
            </el-form>
        </el-col>
        <el-table :data="comments" style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="content" label="评论内容"></el-table-column>
            <el-table-column prop="articleId.title" label="所属文章"></el-table-column>
            <el-table-column prop="createdAt" label="评论时间"></el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="center" @current-change="handleCurrentChange" :current-page="1" :page-size="10" layout=" prev, pager, next" :total="totalComments"></el-pagination>
    </el-row>
    </section>    
</template>

<script>
	import Bmob from '../../api/api';
    export default{
        data(){
            return {
                input: '',
                comments:[],
                totalComments:0,
            }
        },
        methods:{
            del(index,row){
                Bmob.delComments(this.comments[index].objectId)
                .then(res => {
                    this.$message('删除{'+this.comments[index].title+'}成功!');
                    this.comments.splice(index,1);
                }).catch(err => {
                    console.log(err)
                })
            },      
            handleCurrentChange(val) {
                Bmob.getCommentsByPage(val)
                .then((res)=>{
                    console.log(res);
                    this.comments = res;
                })
                .catch((err)=>{
                    console.log(err);
                });
                Bmob.countComments()
                .then((res)=>{
                    this.totalComments = res;
                })
                .catch((err)=>{
                    console.log(err);
                });
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
