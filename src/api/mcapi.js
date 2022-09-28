const { default: Axios, default: axios } = require("axios")
const validator = require("validator")
const fetch = require('node-fetch');

module.exports = {
    getUuid: async(username) => {
        console.log("1 " + username)
        let test =  axios.get("http://localhost:2555/data")

        console.log("test "  + test)


        let uuid = null;
        if(validator.isUUID(username)) {
            let mcData = (await Axios.get("https://sessionserver.mojang.com/session/minecraft/profile/" + username)).data
            uuid = mcData.id ? mcData.id.substr(0,8)+"-"+mcData.id.substr(8,4)+"-"+mcData.id.substr(12,4)+"-"+mcData.id.substr(16,4)+"-"+mcData.id.substr(20) : null   
            
        } else {
            let mcData = (await Axios.get("https://api.mojang.com/users/profiles/minecraft/" + username)).data
            uuid = mcData.id ? mcData.id.substr(0,8)+"-"+mcData.id.substr(8,4)+"-"+mcData.id.substr(12,4)+"-"+mcData.id.substr(16,4)+"-"+mcData.id.substr(20) : null   
            
        }
        return uuid
    }, 
    getUserName: async(uuid) => {
        let mcData = (await Axios.get("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid)).data
        return mcData.name;
    },
    getNameHistory: async(uuid) => {
        //I use labymod api to get NameHisstory because, mojang have removed there nameHistory.
        const request = await fetch(`https://laby.net/api/user/${uuid}/get-names`, {
            headers: {
              'User-Agent': uuid
            }
        })
        .then(res => res.text());
        let data = JSON.parse( request );
        return data



    }

    
}