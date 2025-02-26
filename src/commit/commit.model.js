
import {Schema, model, version} from "mongoose";

const CommitSchema = Schema({
    textoprincipal: {type:String,required:true},
    user:{type:Schema.Types.ObjectId, ref:'user',required:true},
    status:{ type: Boolean, default:true}
},
{
    timestamps:true,
    versionkey:false
});

    export default model('Commit', CommitSchema);