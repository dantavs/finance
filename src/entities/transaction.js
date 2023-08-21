function isParametersValid(data){
    if (!data.name || data.name === ""){
            return false
    }
    if (!data.category || data.category === ""){
        return false
    }

    if (data.category !== "debit" && data.category !== "credit"){
        return false
    }

  
    if (isNaN(data.value)){
        return false
    }

    return true
}

export class Transaction {
    name
    category
    value
    constructor(data){
        if (!isParametersValid(data)){
            throw new Error("invalid parameters!")
        }

        this.name = data.name
        this.category = data.category
        this.value = data.value
    }


    get name (){
        return this.name
    }
}