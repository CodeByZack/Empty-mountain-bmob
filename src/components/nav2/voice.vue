<template>
    <section>
        <el-table :data="voiceList" style="width: 100%">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="author" label="作者@主播"></el-table-column>
            <el-table-column prop="img_url" label="img_url"></el-table-column>
            <el-table-column prop="voice_url" label="voice_url"></el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="center" @current-change="handleCurrentChange" :current-page="1" :page-size="10" layout=" prev, pager, next" :total="totalVoice"></el-pagination>
        <el-col :span="24" class="center" >
            <el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="add">新增</el-button>
				</el-form-item>
            </el-form>
        </el-col>

        <el-dialog title="添加声音" v-model="addFormVisible" >
            <el-form :model="addForm" >
                <el-form-item label="标题">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="作者@主播">
                    <el-input v-model="addForm.author"></el-input>
                </el-form-item>
                <el-form-item label="img_url:">
                    <el-input v-model="addForm.img_url">...</el-input>
                    <el-upload action="http://65.49.209.21/api/voice/uploadImg" :before-upload = "showLoading" :multiple = "false" :limit="1" :on-success="handleSuccess" :show-file-list="false" :headers="auth">
                        <el-button size="small" type="primary">上传图片</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="voice_url:">
                    <el-input v-model="addForm.voice_url">...</el-input>
                    <el-upload action="http://65.49.209.21/api/voice/uploadVoice" :before-upload = "showLoading" :multiple = "false" :limit="1" :on-success="handleSuccess" :show-file-list="false" :headers="auth">
                        <el-button size="small" type="primary">上传声音</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改声音" v-model="editFormVisible" >
            <el-form :model="editForm" >
                <el-form-item label="标题">
                    <el-input v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="作者@主播">
                    <el-input v-model="editForm.author"></el-input>
                </el-form-item>
                <el-form-item label="img_url:">
                    <el-input v-model="editForm.img_url">...</el-input>
                    <el-upload action="http://65.49.209.21/api/voice/uploadImg" :before-upload = "showLoading" :multiple = "false" :limit="1" :on-success="handleSuccess" :show-file-list="false" :headers="auth">
                        <el-button size="small" type="primary">上传图片</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="voice_url:">
                    <el-input v-model="editForm.voice_url">...</el-input>
                    <el-upload action="http://65.49.209.21/api/voice/uploadVoice" :before-upload = "showLoading" :multiple = "false" :limit="1" :on-success="handleSuccess" :show-file-list="false" :headers="auth">
                        <el-button size="small" type="primary">上传声音</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit()">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
	import Bmob from '../../api/api';
    export default{
        data(){
            return{
                voiceList:[],
                loadingInstance:{},
                addFormVisible:false,
                editFormVisible:false,
                addForm:{
                        title:"",
                        author:"",
                        img_url:"",
                        voice_url:""                    
                },
                editForm:{
                        title:"",
                        author:"",
                        img_url:"",
                        voice_url:""                    
                },
                auth:{},
                pagesize:10,
                totalVoice:0

            }
        },
        methods:{
            add(){
                this.addFormVisible = true;
            },
            edit(index,row){
                this.editForm.title = row.title
                this.editForm.author = row.author
                this.editForm.img_url = row.img_url
                this.editForm.voice_url = row.voice_url
                this.editForm.index = index
                this.editFormVisible = true
            },  
            del(index,row){

            },            
            handleSuccess(response){

            },
            confirmAdd(){

            },
            confirmEdit(){

            },               
            handleCurrentChange(val) {

            },    
            showLoading(){
                
            }     
        },
        mounted(){

        }
    }
</script>

<style>
    .center{
        margin-top:30px;
        text-align:center;
    }
</style>