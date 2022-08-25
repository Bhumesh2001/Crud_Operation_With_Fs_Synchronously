const fs = require('fs')
const prompt = require("prompt-sync")()
const dict = {}
while(true){
    try {
        console.log('\npress 1 for create\npress 2 for read\npress 3 for update\npress 4 for delete\npress 5 for exit\n')
        let passwd3 = ()=>{
            let password5 = prompt('Enter your password:-')
            if(password5.length == "8"){
                return password5
            }else{
                console.log("your password shoud be 8 charecter and there shoud be special charecter add.");   
                return passwd3()
            }
        }
        let email = function(){
            let email2 = prompt("Enter your emailAddress:-")
            if(email2.includes('@gmail.com')){   
                return email2
            }else{
                console.log('Please enter valid emailAddress,"@gmail.com" Shoud be present');
                return email()
            }
        }
        let mobaile_unique = function(data){
            let phone_no = prompt("Enter your mobaile number:- ")
            if(phone_no.length == "10"){
                let parse_info = JSON.parse(data);
                let keys = [];
                for(let data1 in parse_info){
                    keys.push(data1)
                }
                if(!keys.includes(phone_no)){
                    return phone_no
                }else{
                    console.log('\nThis mobaile number allready exist\nPlease enter new mobaile number\n');
                    return mobaile_unique()
                }
            }else{
                console.log('Please enter valid mo.number');
                mobaile_unique()
            }
        }
        function create(){
            if(!fs.existsSync('./node/crud1.json')){
                function recall12(){
                    const mobaile = prompt("Enter your mobaile number:- ")
                    if(mobaile.length == "10"){
                        dict[mobaile] = {'userName':prompt('Enter your userName:-'),'Password':passwd3(),
                        'firstName':prompt('Enter your firstname:- '),'lastName':prompt('Enter your lastname:- '),
                        'emailAddress':email()}
                        fs.writeFileSync('./node/crud1.json',JSON.stringify(dict,null,4))
                        console.log('your account created sucessfully....');
                    }else{
                        console.log('Please enter valid mobaile number');
                        recall12()
                    }
                }
                recall12()
            }else{
                let recall2 = ()=>{
                    var read = fs.readFileSync("./node/crud1.json",'utf-8')
                    if(read != ""){
                        var read_data = fs.readFileSync("./node/crud1.json",'utf-8')
                        var mobaile1 =  mobaile_unique(read_data)
                        let read = fs.readFileSync("./node/crud1.json",'utf-8')
                        let parse = JSON.parse(read_data)
                        parse[mobaile1] = {'userName':prompt('Enter your userName:-'),'Password':passwd3(),
                        'firstName':prompt('Enter your firstname:- '),'lastName':prompt('Enter your lastname:- '),
                        'emailAddress':email()}
                        fs.writeFileSync('./node/crud1.json',JSON.stringify(parse,null,4))
                        console.log('your account created sucessfully....');
                    }
                }
                recall2()
            }
        }
        function read(){
            let read1 = fs.readFileSync("./node/crud1.json",'utf-8')
            let parse2 = JSON.parse(read1)
            let phone = prompt('which mobaile number of data do you want to read ?')
            if(phone.length == "10"){
                if(phone in parse2){
                    console.log(parse2[phone]);
                }else{
                    console.log('Sorry, your mobaile number does not exist');
                }
            }else{
                console.log('Please enter valid mo.number');
                read()
            }
        }
        function update(){
            let read2 = fs.readFileSync("./node/crud1.json",'utf-8')
            let parse3 = JSON.parse(read2)
            let mo_update = prompt('which mobaile number of data do you want to update:-')
            if(mo_update.length == "10"){
                if(mo_update in parse3){
                    let data_solve = (parse3,msg)=>{
                        fs.writeFileSync('./node/crud1.json',JSON.stringify(parse3,null,4))
                        console.log(msg);
                    }
                    console.log('What do you want to update ?');
                    console.log('  1.mobaile number\n  2.userName\n  3.password\n  4.firstName\n  5.lastName\n  6.emailAddress');
                    let update1 = parseInt(prompt('Enter your choice:-'))
                    if(update1 == 1){
                        let mo_number = prompt('Enter your new mobaile number:-')
                        parse3[mo_number] = parse3[mo_update]
                        delete parse3[mo_update]
                        const message = 'your mobaile number updated successfully.......'
                        data_solve(parse3,message)
                    }else if(update1 == 2){
                        let userName2 = prompt('Enter the new userName:-')
                        parse3[mo_update]['userName'] = userName2
                        const mesg = 'your userName updated successfully.......'
                        data_solve(parse3,mesg)
                    }else if(update1 == 3){
                        parse3[mo_update]['Password'] = passwd3()
                        const mesg1 = 'your password updated successfully.......'
                        data_solve(parse3,mesg1)
                    }else if(update1 == 4){
                        let firstName = prompt('Enter the new firstName:-')
                        parse3[mo_update]['firstName'] = firstName
                        const mesg1 = 'your firstName updated successfully.......'
                        data_solve(parse3,mesg1)
                    }else if(update1 == 5){
                        let lastName = prompt('Enter the new lastName:-')
                        parse3[mo_update]['lastName'] = lastName
                        const mesg2 = 'your firstName updated successfully.......'
                        data_solve(parse3,mesg2)
                    }else if(update1 == 6){
                        parse3[mo_update]['emailAddress'] = email()
                        const mesg3 = 'your emailAddress updated successfully.......'
                        data_solve(parse3,mesg3)
                    }
                }else{
                    console.log('sorry,your mobaile number does not exist');
                }
            }else{
                console.log('Please enter valid mobaile number');
                update()
            }
        }
        function delete1(){
            let read4 = fs.readFileSync("./node/crud1.json",'utf-8')
            let parse5 = JSON.parse(read4)
            let mo_update1 = prompt('which mobaile number of data do you want to delete:-')
            if(mo_update1.length == "10"){
                if(mo_update1 in parse5){
                    const data_solve1 = function(parse5,message){
                        fs.writeFileSync('./node/crud1.json',JSON.stringify(parse5,null,4))
                        console.log(message);
                    }
                    let array = []
                    for(keys in parse5[mo_update1]){
                        array.push(keys)
                    }
                    console.log('What do you want to delete ?');
                    console.log('  1.All data clear\n  2.userName\n  3.password\n  4.firstName\n  5.lastName\n  6.emailAddress');
                    let choice = parseInt(prompt('Enter your choice:-'))
                    if(choice == 1){
                        delete parse5[mo_update1]
                        let mesg = 'your data deleted successfully........'
                        data_solve1(parse5,mesg)
                    }else if(choice == 2){
                        if(!array.includes('userName')){
                            console.log('your userName , you allready deleted.......');
                        }else{
                            delete parse5[mo_update1]['userName']
                            let mesg2 = 'your userName deleted successfully........'
                            data_solve1(parse5,mesg2)
                        }
                    }else if(choice == 3){
                        if(!array.includes('Password')){
                            console.log('your password , you allready deleted.......');
                        }else{
                            delete parse5[mo_update1]['Password']
                            let mesg3 = 'your password deleted successfully........'
                            data_solve1(parse5,mesg3)
                        }
                    }else if(choice == 4){
                        if(!array.includes('firstName')){
                            console.log('your firstName , you allready deleted.......');
                        }else{
                            delete parse5[mo_update1]['firstName']
                            let mesg4 = 'your firstName deleted successfully........'
                            data_solve1(parse5,mesg4)
                        }
                    }else if(choice == 5){
                        if(!array.includes('lastName')){
                            console.log('your lastName , you allready deleted.......');
                        }else{
                            delete parse5[mo_update1]['lastName']
                            let mesg4 = 'your lastName deleted successfully........'
                            data_solve1(parse5,mesg4)
                        }
                    }else if(choice == 6){
                        if(!array.includes('emailAddress')){
                            console.log('your emailAddress , you allready deleted.......');
                        }else{
                            delete parse5[mo_update1]['emailAddress']
                            let mesg6 = 'your emailAddress deleted successfully........'
                            data_solve1(parse5,mesg6)
                        }
                    }
                }else{
                    console.log('sorry,your mobaile number does not exist.');
                }
            }else{
                console.log('Please enter valid mobaile number');
                delete1()
            }
        }
        let user_choice = parseInt(prompt('Enter your choice: '))
        if(user_choice == 1){
            create()
        }else if(user_choice == 2){
            read()
        }else if(user_choice == 3){
            update()
        }else if(user_choice == 4){
            delete1()
        }else if(user_choice == 5){
            break
        }
    }catch(error){
        console.log('Sorry your mobaile number does not exist');
    }
}
