import { model, Schema } from "mongoose";

const userSchema = new Schema({
    frist_name : {
        type : String,
        required : true,
        trim : true
    },
    sur_name : {
        type : String,
        required : true,
        trim  : true
    },
    username : {
        type : String,
        trim : true,
        default : null
    },
    secondary_name : {
        type : String,
        default : "",
        trim : true
    },
    email : {
        type : String,
        trim : true,
        default : null
    }, 
    phone : {
        type : String,
        trim : true,
        default : null
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        enum : ["Male", "Female", "Custom"],
        required : true
    },
    brith_date : {
        type : String,
        required : true
    },
    profile_photo : {
        type : String,
        default : null
    },
    cover_poto : {
        type : String,
        default : null
    },
    bio : {
        type : String,
        default : null,
    },
    hobbies : {
        type : Array,
        default : []
    },
    work : {
        type : Array,
        default : []
    },
    education : {
        type : Array,
        default : []
    },
    featured : {
        type : String,
        default : null
    },
    living : {
        type : String,
        default : null
    },
    relationship : {
        type : String,
        default : null
    },
    joined : {
        type : Date,
        required : true
    },
    social_link : {
        type : Array,
        default : []
    },
    isActive : {
        type : Boolean,
        default : false
    },
    code : {
        type : String,
    },
    friends : {
        type : Array,
        default : []
    },
    flowing : {
        type : Array,
        default : []
    },
    flowers : {
        type : Array,
        default : []
    },
    request : {
        type : Array,
        default : []
    }
},{
    timestamps : true
})

const userModel = model('Users', userSchema)

// export usermodel
export default userModel