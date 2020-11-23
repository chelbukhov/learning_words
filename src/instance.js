import privateKey  from './key'


const TronWeb = require('tronweb');
const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
const factoryAddress = 'TNmemASbqMTd6rqCGP7CWnq5e4LrtP7dWS';


export async function groupCount(){
    let instance = await tronWeb.contract().at(factoryAddress);
    let groupCount = await instance.groupCounter().call();
    return groupCount;
}

export async function activeGroupCount(){
    let instance = await tronWeb.contract().at(factoryAddress);
    let groupCount = await instance.groupCounter().call();
    let counter = 0;
    let activeGroup = 0;

    while (counter < groupCount) {
        let groupDetail = await await instance.groupArray(counter).call();
        console.log('groupDteail: '+ groupDetail.isActive)
        if (groupDetail.isActive) {
            activeGroup++;
        }

        counter++;
    }
    console.log('Обнаружено групп: ' + groupCount);
    console.log('Из них активных ' + activeGroup);
    return activeGroup;
}

export async function groupDetail(index){
    let instance = await tronWeb.contract().at(factoryAddress);
    let groupDetail = await await instance.groupArray(index).call();
    //console.log('groupDetail: ', groupDetail)
    return groupDetail;
}


export async function getGroupArray() {
    const courses = await groupCount();
    let Course = {
        id: Number,
        walletID: String,
        name: String,
        description: String,
        originalLanguage: String,
        translateLanguage: String,
        price: Number,
        rating: Number,
        contract: String
    }

    let myCourseArr = new Array(Course);
    myCourseArr.pop();

    for (let i = 0; i < courses; i++){
        const CN = await groupDetail(i);
        if(CN.isActive){
            myCourseArr.push({
            id: i,
//            walletID: CN.walletID,
            header: CN.name,
            description: CN.description,
            meta: CN.originalLanguage + ' - ' + CN.translateLanguage,
//            originalLanguage: CN.originalLanguage,
//            translateLanguage: CN.translateLanguage,
//            price: CN.price,
//            rating: CN.rating,
            href: '',
            extra: 'Подробнее..'

            
            });
        }
    }

    return myCourseArr;

}


export async function wordsCount(){
    let instance = await tronWeb.contract().at('TP5wAV9C4DHFu4BT21vZTN26pMkUSFpRKq');
    let wordsCount = await instance.wordsCount().call();
    //console.log('Обнаружено слов: ' + wordsCount);
    return wordsCount;
}

export async function word(index){
    let instance = await tronWeb.contract().at('TP5wAV9C4DHFu4BT21vZTN26pMkUSFpRKq');
    let word = await await instance.wordsArray(index).call();
    // console.log('Получено слово: ' + word);
    // let arrayOfWords = [];
    // for (let i=0; i<wordsCount; i++){
    //     arrayOfWords[i] = await instance.wordsArray(i).call();
    // }
    // console.log(arrayOfWords);
    return word;
}



