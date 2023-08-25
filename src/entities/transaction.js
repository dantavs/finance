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

    if (!data.date || isNaN(Date.parse(data.date))){

        return false
    }

  
    if (isNaN(data.value)){
        return false
    }

    return true
}

export class Transaction {
    id
    name
    category
    value
    date
    constructor(data){
        if (!isParametersValid(data) || !data){
            throw new Error("invalid parameters!")
        }

        this.id = data.id ? data.id : crypto.randomUUID()
        this.name = data.name
        this.category = data.category
        this.value = data.value
        this.date = new Date(data.date)
    }


    get name (){
        return this.name
    }
}