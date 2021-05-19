<template>
    <div class="row">
        <a v-if="token.length==0" class="linkedin" href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78cts0uaj8cm1g&scope=r_liteprofile%20r_emailaddress&redirect_uri=http://localhost:8080/linkedinauth"></a>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name:"Import",
    props:["authcode"],
    data(){
        return {
            clientid:'78cts0uaj8cm1g',
            client_secret: 'BkC6oasyVCKwNP1z',
            token:'AQWYybt-4TtkjU4GKja98nPWhDMwkSpBfJmitAdwInNaopSHsj4Cd2XuaxF7BpxFAibMuY-qXNO2CA_izhR2bn1HPUaMxSeaL5sVTzy9PmS8FEBQXi6d1Howv3peHHZo_B9ryjLPQsN_9axh5ztUM0_K9A6e4EPwTeunq4UZUQqplEe4E-Ro-rj-WpnZ64aLLZWNzFSKG5eIVoOCDQ3D4_iw5JTeaUfJTbcioadkXGbabt7J4Djqf9Xm7WL8oUL5vQu1UFPom0cUBFSdqb8HDQbPsP9Rd8dwRHTo7hVdWsnhP53ppRqsuRiriuG3cDGsFG-KvIaQyQ5pT7zhGW_SBLisa_9dkQ'
        }
    },
    methods:{
    },
    mounted(){
        if(this.token.length==0)
            setTimeout(()=>{
                console.log(this.authcode)
                let linkedin = localStorage.getItem('linkedin');
                if(linkedin){
                    if(linkedin.expiry > (new Date()).getTime())
                        this.token = linkedin.token
                    else
                        localStorage.removeItem('linkedin')
                }
                if(this.authcode && this.token==''){
                    let options={
                        'grant_type':'authorization_code',
                        'code':this.authcode,
                        'client_id':this.clientid,
                        'client_secret':this.client_secret,
                        'redirect_uri':document.location.href.split('?')[0]
                    };
                    axios.post("https://www.linkedin.com/oauth/v2/accessToken",options)
                    .then((data)=>{
                        if(Object.keys(data).includes('access_token')){
                            this.token = data.access_token;
                            data.expiry=(new Date()).getTime() + data.expires,
                            localStorage.setItem("linkedin",data)
                        }
                    })
                }
            },2000);
        else{
            axios.get('https://api.linkedin.com/v2/me',{headers:{'Authorization': 'Bearer '+this.token}})
            .then((data)=>{
                console.log(data);
            })
        }
    }
}
</script>

<style>
.linkedin{
    width: 430px;
    height:80px;
    background-image: url('../assets/linkedinDefault.png');
    margin:10px;
    display:block
}
.linkedin:hover{
    background-image: url('../assets/linkedinHover.png');
}
.linkedin:active{
    background-image: url('../assets/linkedinActive.png');
}
</style>
